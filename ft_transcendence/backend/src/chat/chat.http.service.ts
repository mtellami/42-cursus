import  { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from 'dto/create-chat.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from 'src/common/constants/constants';
import { ChangeChatPrivacyDto } from 'dto/change-chat-privacy.dto';
import { getDateFromNowToDurationInMinutes } from 'src/common/utils/date-time';
import { MuteUserChatDto } from 'dto/mute-user-chat.dto';
import { JoinChatDto } from 'dto/join-chat.dto';
import { ChatData, ChatMemberData } from 'datatype/chat.type';
import { ChatWsService } from './chat.ws.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService, private chatWs: ChatWsService) {}

    async getAllChat(userid: string): Promise<ChatData[]> {
        const { chatMember } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                chatMember: {
                    where: {
                        NOT: [
                            { status: 'BANED', },
                        ],
                    },
                    select: {
                        role: true,
                        status: true,
                        createdAt: true,
                        mutedUntil: true,
                        chat: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                status: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
        return chatMember;
    }

    async search(userid: string, tofind: string): Promise<any> {
        const data = await this.prisma.chat.findMany({
            where: {
                name: {
                    contains: tofind,
                },
                status: {
                    not: 'PRIVATE',
                },
                members: {
                    none: {
                        userid: userid,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                status: true,
            }
        });
        return data;
    }

    async getAllChatMembers(chatid: string): Promise<ChatMemberData[]> {
        const { members } = await this.prisma.chat.findUnique({
            where: {
                id: chatid,
            },
            select: {
                members: {
                    where: {
                        NOT: [
                            { status: 'BANED', }
                        ],
                    },
                    select: {
                        role: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        });
        return members;
    }

    async createChat(userid: string, options: CreateChatDto):Promise<ChatData> {
        let hashedPassword: string = '';

        if (options.status === 'PROTECTED') {
            if (!options.password) {
                throw new BadRequestException('Password not provided');
            }
            hashedPassword = await bcrypt.hash(options.password, BCRYPT_SALT);
        }
        const { avatar } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                avatar: true,
            }
        });
        const chat = await this.prisma.chatMember.create({
            data: {
                user: {
                    connect: {
                        id: userid,
                    },
                },
                chat: {
                    create: {
                        status: options.status,
                        avatar: avatar,
                        name: options.name,
                        password: hashedPassword,
                    }
                },
                role: 'OWNER',
            },
            select: {
                role: true,
                status: true,
                createdAt: true,
                mutedUntil: true,
                chat: {
                    select: {
                        id: true,
                        status: true,
                        name: true,
                        avatar: true,
                    }
                },
            },
        });
        return chat;
    }

    async joinChatRoom(userid: string, options: JoinChatDto): Promise<void> {
        const chat = await this.prisma.chat.findFirst({
            where: {
                id: options.id,
                members: {
                    none: {
                        userid: userid,
                    },
                },
            },
            select: {
                status: true,
                password: true,
            },
        });
        if (chat === null || chat.status === 'PRIVATE') {
            throw new BadRequestException("can't join chat room");
        }
        const isMatch = options.password ? (await bcrypt.compare(options.password, chat.password)) : false;
        if (chat.status === 'PROTECTED' && isMatch === false) {
            throw new BadRequestException('incorrect password for this PROTECTED chat room');
        }
        await this.prisma.chatMember.create({
            data: {
                userid: userid,
                chatid: options.id,
                role: 'MEMBER',
            },
        });
    }

    async leaveChatRoom(userid: string, chatid: string): Promise<void> {
        await this.prisma.chat.update({
            where: {
                id: chatid,
            },
            data: {
                members: {
                    deleteMany: {
                        userid: userid,
                    },
                },
            },
        });
    }

    async changeChatPrivacy(chatid: string, options: ChangeChatPrivacyDto): Promise<void> {
        let hashedPassword: string = '';

        if (options.status === 'PROTECTED') {
            if (!options.password) {
                throw new BadRequestException('Password not provided');
            }
            hashedPassword = await bcrypt.hash(options.password, BCRYPT_SALT);
        }
        await this.prisma.chat.update({
            where: {
                id: chatid,
            },
            data: {
                status: options.status,
                password: hashedPassword,
            },
        });
    }

    async changeChatName(chatid: string, name: string): Promise<void> {
        await this.prisma.chat.update({
            where: {
                id: chatid,
            },
            data: {
                name: name,
            },
        });
    }

    async changeChatAvatar(chatid: string, file: Express.Multer.File): Promise<void> {
        if (!file) {
            throw new BadRequestException('Only image format JPEG,JPG are allowed.');
        }
        const chat = await this.prisma.chat.update({
            where: {
                id: chatid,
            },
            data: {
                avatar: file.fieldname,
            },
            select: {
                id: true,
                status: true,
                name: true,
                avatar: true,
            }
        });
    }

    async changeChatPassword(chatid: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

        const { count } = await this.prisma.chat.updateMany({
            where: {
                id: chatid,
                status: 'PROTECTED',
            },
            data: {
                password: hashedPassword,
            },
        });
        if (!count) {
            throw new BadRequestException('chat was not protected');
        }
    }

    async removeChatPassword(chatid: string): Promise<void> {
        const { count } = await this.prisma.chat.updateMany({
            where: {
                id: chatid,
                status: 'PROTECTED',
            },
            data: {
                status: 'PUBLIC',
            },
        });
        if (!count) {
            throw new BadRequestException('chat was not protected');
        }
    }

    async setUserAsChatAdmin(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: userid,
                role: 'MEMBER',
            },
            data: {
                role: 'ADMIN',
                status: 'NORMAL',
            },
        });
        if (!count) {
            throw new BadRequestException("can't set user as ADMIN");
        }
    }

    async unsetUserAsChatAdmin(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: userid,
                role: 'ADMIN',
            },
            data: {
                role: 'MEMBER',
            },
        });
        if (!count) {
            throw new BadRequestException("user is't ADMIN");
        }
    }

    async kickAdminFromChat(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.deleteMany({
            where: {
                chatid: chatid,
                userid: userid,
								role: {
									in: ['ADMIN', 'MEMBER'],
            		},
						}
        });
        if (!count) {
            throw new BadRequestException('user not chat admin or member');
        }
        this.chatWs.leaveUserFromRoomOnBanOrKick(userid, chatid);
    }

    async banAdminChat(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: userid,
								role: {
									in: ['ADMIN', 'MEMBER'],
            		},
            },
            data: {
                role: 'NOROLE',
                status: 'BANED',
            },
        });
        if (!count) {
            throw new BadRequestException('user not chat admin or member');
        }
        this.chatWs.leaveUserFromRoomOnBanOrKick(userid, chatid);
    }

    async muteAdminChat(chatid: string, options: MuteUserChatDto): Promise<void> {
        const mutedUntil: Date = getDateFromNowToDurationInMinutes(options.duration);

        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: options.id,
								role: {
									in: ['ADMIN', 'MEMBER'],
            		},
            },
            data: {
                status: 'MUTED',
                mutedUntil: mutedUntil,
            },
        });
        if (!count) {
            throw new BadRequestException('user not chat admin or member');
        }
    }

    async kickUserFromChat(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.deleteMany({
            where: {
                chatid: chatid,
                userid: userid,
                role: 'MEMBER',
            },
        });
        if (!count) {
            throw new BadRequestException('user not chat memeber, or is a admin');        
        }
        this.chatWs.leaveUserFromRoomOnBanOrKick(userid, chatid);
    }

    async banUserChat(chatid: string, userid: string): Promise<void> {
        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: userid,
                role: 'MEMBER',
            },
            data: {
                role: 'NOROLE',
                status: 'BANED',
            },
        });
        if (!count) {
            throw new BadRequestException('user not chat memeber, or is a admin');
        }
        this.chatWs.leaveUserFromRoomOnBanOrKick(userid, chatid);
    }

    async muteUserChat(chatid: string, options: MuteUserChatDto): Promise<void> {
        const mutedUntil: Date = getDateFromNowToDurationInMinutes(options.duration);

        const { count } = await this.prisma.chatMember.updateMany({
            where: {
                chatid: chatid,
                userid: options.id,
                role: 'MEMBER',
            },
            data: {
                status: 'MUTED',
                mutedUntil: mutedUntil,
            },
        });
        if (!count) {
            throw new BadRequestException('user not chat memeber, or is a admin');
        }
    }
}
