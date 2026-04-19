import { BadRequestException, Injectable } from "@nestjs/common";
import { BlockedFriendship } from "datatype/blocked-friendship.type";
import { PrismaService } from "src/common/prisma/prisma.service";
import { PART_SIZE } from 'src/common/constants/constants';
import { SentFriendship } from "datatype/sent-friendship.type";
import { ReceivedFriendship } from "datatype/received-friendship.type";
import { AcceptedFriendship } from "datatype/accepted-friendship.type";

@Injectable()
export class FriendshipService {
    constructor(private prisma: PrismaService) {}

    async isWeAreFriends(userid: string, userId: string):Promise<boolean> {
        const { sentFriendships, receivedFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        receiverId: userId,
                        status: 'ACCEPTED',
                    },
                    select: {},
                },
                receivedFriendships: {
                    where: {
                        senderId: userId,
                        status: 'ACCEPTED',
                    },
                    select: {},
                },
            },
        });
        return (sentFriendships.length || receivedFriendships.length) ? true : false;
    }

    async isIBlockedHim(myid: string, userid: string):Promise<boolean> {
        const { sentFriendships } = await this.prisma.user.findUnique({
            where: {
                id: myid,
            },
            select: {
                sentFriendships: {
                    where: {
                        receiverId: userid,
                        status: 'BLOCKED',
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });
        return sentFriendships.length ? true : false;
    }

    async isHeBlockedMe(myid: string, userid: string):Promise<boolean> {
        const { receivedFriendships } = await this.prisma.user.findUnique({
            where: {
                id: myid,
            },
            select: {
                receivedFriendships: {
                    where: {
                        senderId: userid,
                        status: 'BLOCKED',
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });
        return receivedFriendships.length ? true : false;
    }

    async allBlockedUsersForChatWs(userid: string): Promise<string[]> {
        const { sentFriendships, receivedFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                sentFriendships: {
                    where: {
                        status: 'BLOCKED',
                    },
                    select: {
                        receiverId: true,
                    },
                },
                receivedFriendships: {
                    where: {
                        status: 'BLOCKED',
                    },
                    select: {
                        senderId: true,
                    },
                },
            },
        });
        return sentFriendships.map(sent => sent.receiverId)
                .concat(receivedFriendships.map(received => received.senderId));
    }

    async countAllFriends(userid: string):Promise<number> {
        const { _count } = await this.prisma.user.aggregate({
            where: {
                id: userid,
                sentFriendships: {
                    every: {
                        status: 'ACCEPTED',
                    },
                },
                receivedFriendships: {
                    every: {
                        status: 'ACCEPTED',
                    },
                },
            },
            _count: true,
        });
        return _count;
    }

    async allFriends(userid: string): Promise<AcceptedFriendship[]> {
        const { sentFriendships, receivedFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where : {
                        status : "ACCEPTED",
                    },
                    select: {
                        id: true,
                        since: true,
                        receiver: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                status: true,
                            },
                        },
                    },
                },
                receivedFriendships: {
                    where : {
                        status : "ACCEPTED",
                    },
                    select: {
                        id: true,
                        since: true,
                        sender: {
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

        const sentFriends = sentFriendships.map(
            (sent) => ({
                id: sent.id,
                since: sent.since,
                friend: sent.receiver,
            }),
        );
        const receivedFriends = receivedFriendships.map(
            (received) => ({
                id: received.id,
                since: received.since,
                friend: received.sender,
            }),
        );
        return sentFriends.concat(receivedFriends);
    }

    async allFriendsByParts(userid: string, part: number): Promise<AcceptedFriendship[]> {
        part = part > 0 ? part : 0;
        const friendships = await this.prisma.friendship.findMany({
            where: {
                status: 'ACCEPTED',
                OR: [
                    { senderId: userid, },
                    { receiverId: userid, },
                ],
            },
            select: {
                id: true,
                since: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        status: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        status: true,
                    },
                },
            },
            skip: PART_SIZE * part,
            take: PART_SIZE,
        });
        const friends = friendships.map(
            (friendship) => {
                if (friendship.sender.id === userid) {
                    return {
                        id: friendship.id,
                        since: friendship.since,
                        friend: friendship.receiver,
                    };
                } else {
                    return {
                        id: friendship.id,
                        since: friendship.since,
                        friend: friendship.sender,
                    };
                }
            },
        );
        return friends;
    }

    async countAllBlockedUsers(userid: string): Promise<number> {
        const { _count } = await this.prisma.user.aggregate({
            where: {
                id: userid,
                sentFriendships: {
                    every: {
                        status: 'BLOCKED',
                    },
                },
            },
            _count: true,
        });
        return _count;
    }

    async allBlockedUsers(userid: string): Promise<BlockedFriendship[]> {
        const { sentFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        status: 'BLOCKED',
                    },
                    select: {
                        id: true,
                        since: true,
                        receiver: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            }
                        }
                    },
                },
            },
        });
        return sentFriendships;
    }

    async allBlockedUsersByParts(userid: string, part: number): Promise<BlockedFriendship[]> {
        part = part > 0 ? part : 0;
        const { sentFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        status: 'BLOCKED',
                    },
                    select: {
                        id: true,
                        since: true,
                        receiver: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            }
                        }
                    },
                    skip: PART_SIZE * part,
                    take: PART_SIZE,
                },
            },
        });
        return sentFriendships;
    }

    async countAllSentRequests(userid: string): Promise<number> {
        const { _count } = await this.prisma.user.aggregate({
            where: {
                id: userid,
                sentFriendships: {
                    every: {
                        status: 'PENDING',
                    },
                },
            },
            _count: true,
        });
        return _count;
    }

    async allSentRequests(userid: string): Promise<SentFriendship[]> {
        const { sentFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        status: 'PENDING',
                    },
                    select: {
                        id: true,
                        since: true,
                        receiver: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                level: true,
                            },
                        },
                    },
                },
            },
        });
        return sentFriendships;
    }

    async allSentRequestsByParts(userid: string, part: number): Promise<SentFriendship[]> {
        part = part > 0 ? part : 0;
        const { sentFriendships } = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        status: 'PENDING',
                    },
                    select: {
                        id: true,
                        since: true,
                        receiver: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                level: true,
                            },
                        },
                    },
                    skip: PART_SIZE * part,
                    take: PART_SIZE,
                },
            },
        });
        return sentFriendships;
    }

    async countAllReceivedRequests(userid: string): Promise<number> {
        const { _count } = await this.prisma.user.aggregate({
            where: {
                id: userid,
                receivedFriendships: {
                    every: {
                        status: 'PENDING',
                    },
                },
            },
            _count: true,
        });
        return _count;
    }

    async allReceivedRequests(userid: string): Promise<ReceivedFriendship[]> {
        const data = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                receivedFriendships: {
                    where: {
                        status: 'PENDING',
                    },
                    select: {
                        id: true,
                        since: true,
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                level: true,
                            },
                        },
                    },
                },
            },
        });
        return data?.receivedFriendships || [];
    }

    async allReceivedRequestsByParts(userid: string, part: number): Promise<ReceivedFriendship[]> {
        part = part > 0 ? part : 0;
        const data = await this.prisma.user.findUnique({
            where: {
                id: userid,
            },
            include: {
                receivedFriendships: {
                    where: {
                        status: 'PENDING',
                    },
                    select: {
                        id: true,
                        since: true,
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                                level: true,
                            },
                        },
                    },
                    skip: PART_SIZE * part,
                    take: PART_SIZE,
                },
            },
        });
        return data?.receivedFriendships || [];
    }

    async requestFriendship(userid: string, friendId: string): Promise<void> {
        if (userid === friendId) {
            throw new BadRequestException('you are friend of yourself.');
        }
        const { sentFriendships, receivedFriendships } = await this.prisma.user.findUnique({
            where : {
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        receiverId: friendId,
                    },
                },
                receivedFriendships: {
                    where: {
                        senderId: friendId,
                    },
                },
            },
        });

        if (sentFriendships.length || receivedFriendships.length) {
            throw new BadRequestException("Can't request friendship.");
        }

        try {
            await this.prisma.friendship.create({
                data: {
                    senderId: userid,
                    receiverId: friendId,
                },
            });
        }
        catch (error) {
            if (error?.code === 'P2003' || null) {
                throw new BadRequestException('Friend trying to send request not found');
            }
            throw error;
        }
    }

    async blockUser(userid: string, userId: string): Promise<void> {
        const { sentFriendships, receivedFriendships } = await this.prisma.user.findUnique({
            where :{
                id: userid,
            },
            include: {
                sentFriendships: {
                    where: {
                        receiverId: userId,
                    },
                },
                receivedFriendships: {
                    where: {
                        senderId: userId,
                    },
                },
            },
        });

        if (sentFriendships.length) {
            if (sentFriendships[0].status === 'BLOCKED') {
                throw new BadRequestException("User already blocked.");
            }
            await this.prisma.friendship.update({
                where: {
                    id: sentFriendships[0].id,
                },
                data: {
                    status: 'BLOCKED',
                },
            });
        }
        if (receivedFriendships.length) {
            if (receivedFriendships[0].status === 'BLOCKED') {
                throw new BadRequestException('User to block was not found.');
            }
            await this.prisma.friendship.update({
                where: {
                    id: receivedFriendships[0].id,
                },
                data: {
                    senderId: userid,
                    receiverId: userId,
                    status: 'BLOCKED',
                },
            });
            return ;
        }

        try {
            await this.prisma.friendship.create({
                data: {
                    senderId: userid,
                    receiverId: userId,
                    status: 'BLOCKED',
                },
            });
            return ;
        }
        catch (error) {
            if (error?.code === 'P2003' || null) {
                throw new BadRequestException('User to block was not found.');
            }
            throw error;
        }
    }

    async unblockUser(userid: string, friendshipId: string): Promise<void> {
        const { count } = await this.prisma.friendship.deleteMany({
            where: {
                id: friendshipId,
                senderId: userid,
                status: 'BLOCKED',
            },
        });
        if (!count) {
            throw new BadRequestException("User wasn't in block-list.");
        }
    }

    async cancelFriendshipRequest(userid: string, friendshipId: string): Promise<void> {
        const { count } = await this.prisma.friendship.deleteMany({
            where: {
                id: friendshipId,
                senderId: userid,
                status: 'PENDING',
            },
        });
        if (!count) {
            throw new BadRequestException('Friendship request not found.');
        }
    }

    async acceptFriendship(userid: string, friendshipId: string): Promise<void> {
        const {count } = await this.prisma.friendship.updateMany({
            where : {
                id: friendshipId,
                receiverId: userid,
                status: 'PENDING',
            },
            data: {
                status: 'ACCEPTED',
            }
        });
        if (!count) {
            throw new BadRequestException('Friendship request was not found.');
        }
    }

    async rejectFriendship(userid: string, friendshipId: string): Promise<void> {
        const { count } = await this.prisma.friendship.deleteMany({
            where : {
                id: friendshipId,
                receiverId: userid,
                status: 'PENDING',
            },
        });
        if (!count) {
            throw new BadRequestException('Friendship request was not found.');
        }
    }
    
    async removeFriendship(userid: string, friendshipId: string): Promise<void> {
        const { count } = await this.prisma.friendship.deleteMany({
            where: {
                id: friendshipId,
                status: 'ACCEPTED',
                OR: [
                    { senderId: userid, },
                    { receiverId: userid, },
                ],
            },
        });
        if (!count) {
            throw new BadRequestException("Can't remove friendship.");
        }
    }
}
