import {Inject, Injectable, forwardRef} from "@nestjs/common";
import {PrismaService} from "src/common/prisma/prisma.service";
import { WS_MESSAGE_PART_SIZE} from "../common/constants/constants";
import {WsMessageType} from "../../datatype/ws-message.type";
import { WsChatMessageDto, WsChatMessageHistoryDto } from "dto/chat-message.dto";
import { MultiMap } from "src/common/utils/multi-map";
import { SocketUser } from "datatype/socket-ws.type";
import { WsBadRequestException } from "src/common/exceptions/ws-custom.exception";
import { WSService } from "src/websocket/websocket.service";
import * as EVENTS from "src/common/constants/constants";
import { FriendshipService } from "src/friendship/friendship.service";

@Injectable()
export class ChatWsService {
    constructor(private prisma: PrismaService,
        private friendship: FriendshipService,
        @Inject(forwardRef(() => WSService)) private ws: WSService) {}

    private socketRooms: MultiMap<string> = new MultiMap<string>();
    private roomSockets: MultiMap<SocketUser> = new MultiMap<SocketUser>();

    onConnect(socket: SocketUser): void {
    }

    onDisconnect(socket: SocketUser): void {
        this.socketRooms.get(socket.id).map((room) => {
            socket.leave(room);
            this.roomSockets.delete(room, socket);
        });
        this.socketRooms.deleteKey(socket.id);
    }

    async chatNewMessage(socket: SocketUser, message: WsChatMessageDto): Promise<void> {
        const msg = await this.prisma.chatMessage.create({
            data: {
                senderid: socket.user.id,
                chatid: message.chatid,
                content: message.content,
            },
            select: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                chatid: true,
                at: true,
                content: true,
            },
        });
        const blockedUsers = await this.friendship.allBlockedUsersForChatWs(socket.user.id);
        this.roomSockets.get(message.chatid).map((userSocket) => {
            if (blockedUsers.includes(userSocket.user.id)) {
                userSocket.emit(EVENTS.WS_CHAT_EVENT_MESSAGE, {
												sender: { id: '', name: '', avatar: '' },
                        chatid: msg.chatid,
                        at: msg.at,
												content: 'Message Content is Hidden'
                    }
                );
            // } else if (userSocket === socket) {
            //     userSocket.emit(EVENTS.WS_CHAT_EVENT_MESSAGE, {
            //             chatid: msg.chatid,
            //             at: msg.at,
            //             content: msg.content,
            //         }
            //     );
            } else {
                userSocket.emit(EVENTS.WS_CHAT_EVENT_MESSAGE, msg);
            }
        })
    }

    async chatMessageHistory(options: WsChatMessageHistoryDto): Promise<WsMessageType[]> {
        return this.prisma.chatMessage.findMany({
            where: {
                chatid: options.chatid,
                at: {
                    lt: options.before,
                },
            },
            orderBy: {
                at: 'asc',
            },
            take: WS_MESSAGE_PART_SIZE,
            select: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                chatid: true,
                at: true,
                content: true,
            },
        });
    }

    async joinChatRoom(socket: SocketUser, chatid: string): Promise<WsMessageType[]> {
        // this.socketRooms.get(socket.id).map((room) => {
        //     if (room === chatid) {
        //         throw new WsBadRequestException('already joined in');
        //     }
        // })
				if (!this.socketRooms.get(socket.id).includes(chatid)) {
        	this.socketRooms.add(socket.id, chatid);
        	socket.join(chatid);
        	this.roomSockets.add(chatid, socket);
				}
        const messages = await this.prisma.chatMessage.findMany({
            where: {
                chatid: chatid,
            },
            orderBy: {
                at: 'asc',
            },
            // take: WS_MESSAGE_PART_SIZE,
            select: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                chatid: true,
                at: true,
                content: true,
            },
        });	
        const blockedUsers = await this.friendship.allBlockedUsersForChatWs(socket.user.id);
				return messages.map((msg) => {
						if (blockedUsers.includes(msg.sender.id)) {
								return {
										sender: { id: '', name: '', avatar: '' },
										chatid: msg.chatid,
										at: msg.at,
										content: 'Message Content is Hidden'
								}
						} else {
								return msg;
						}
				})
    }

    leaveUserFromRoomOnBanOrKick(userid: string, roomid: string): void {
        this.ws.getUserSockets(userid).map((socket) => {
            this.socketRooms.get(socket.id).map((room) => {
                if (room === roomid) {
                    socket.leave(room);
                    this.roomSockets.delete(room, socket);
                }
            });
            this.socketRooms.delete(socket.id, roomid);
        });
    }
}
