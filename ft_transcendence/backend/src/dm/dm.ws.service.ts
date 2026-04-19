import { Injectable } from "@nestjs/common";
import { SocketUser } from "datatype/socket-ws.type";
import { WsMessageType } from "datatype/ws-message.type";
import { WsChatMessageDto, WsChatMessageHistoryDto } from "dto/chat-message.dto";
import { WS_DM_EVENT_MESSAGE, WS_MESSAGE_PART_SIZE } from "src/common/constants/constants";
import { PrismaService } from "src/common/prisma/prisma.service";


@Injectable()
export class DmWsService {
    constructor(private prisma: PrismaService) {}

    async newWsMessage(socket: SocketUser, message: WsChatMessageDto): Promise<WsMessageType> {
        const messageData = await this.prisma.dmMessage.create({
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
            }
       });
       return messageData;
    }

    async wsMessageHoistory(options: WsChatMessageHistoryDto): Promise<WsMessageType[]> {
        return await this.prisma.dmMessage.findMany({
            where: {
                chatid: options.chatid,
                at: {
                    lt: options.before,
                },
            },
            orderBy: {
                at: 'asc',
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
    }

    async joinDmRoom(socket: SocketUser, chatid: string): Promise<WsMessageType[]> {
        socket.join(chatid);
        return await this.prisma.dmMessage.findMany({
            where: {
                chatid: chatid,
            },
            orderBy: {
                at: 'asc',
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
    }
}
