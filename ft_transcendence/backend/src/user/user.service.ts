import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserData, FriendshipStatus, UserProfile } from 'datatype/user-profile.type';
import { UserSearchData } from 'datatype/user-search-data.type';
import { PART_SIZE } from 'src/common/constants/constants';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(myid: string, tofind: string): Promise<UserSearchData[]> {
    const user = await this.prisma.user.findMany({
      where: {
        name: {
          startsWith: tofind,
        },
			id: {
					not: myid,
				}	
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
    return user;
  }

  async getAllLeaders(): Promise<UserData[]> {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        level: true,
        wins: true,
        losses: true,
        achievements: true,
      },
      orderBy: {
        level: 'desc',
      },
      take: PART_SIZE,
    });
    return user;
  }

  async myInfo(userid: string): Promise<UserData> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userid,
      },
      include: {
        account: {
          select: {
            createdAt: true,
            isTwofaEnabled: true,
          }
        }
      }
    });
    return user;
  }

  async userInfo(myid: string, userId: string): Promise<UserProfile> {
    const allUserInfo = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        sentFriendships: {
          where: {
            receiverId: myid,
          },
        },
        receivedFriendships: {
          where: {
						senderId: myid,
          },
        },
      },
    });

    if (!allUserInfo) {
      throw new BadRequestException('user was not found');
    }
    const { sentFriendships, receivedFriendships, ...user } = allUserInfo;
    const { status, lastSeen, ...userPublicData } = user;
    const sent = sentFriendships.length !== 0 ? sentFriendships.at(0) : null;
    const received = receivedFriendships.length !== 0 ? receivedFriendships.at(0) : null;
  
    if (sent) {
      switch (sent.status) {
        case 'ACCEPTED':
          return {
            id: sent.id,
            since: sent.since,
            status: FriendshipStatus.FRIEND,
            user: user,
          };
        case 'BLOCKED':
          throw new BadRequestException('user was not found');
        case 'PENDING':
          return {
            id: sent.id,
            since: sent.since,
            status: FriendshipStatus.RECEIVED,
            user: userPublicData,
          };
        
      }
    }
    if (received) {
      switch (received.status) {
        case 'ACCEPTED':
          return {
            id: received.id,
            since: received.since,
            status: FriendshipStatus.FRIEND,
            user: user,
          };
        case 'BLOCKED':
          return {
            id: received.id,
            since: received.since,
            status: FriendshipStatus.BLOCKED,
            user: userPublicData,
          };
        case 'PENDING':
          return {
            id: received.id,
            since: received.since,
            status: FriendshipStatus.SENT,
            user: userPublicData,
          };
      }
    }

    return { status: FriendshipStatus.NONE, user: userPublicData };
  }

  async updateAvatar(file: Express.Multer.File, userid: string): Promise<UserData> {
    if (!file) {
      throw new BadRequestException('Only image format JPEG,JPG are allowed.');
    }
    const updatedUser = await this.prisma.user.update({ 
      where: {
        id: userid,
      }, 
      data: {
        avatar: file.fieldname,
      },
    });
    return updatedUser;
  }

  async updateName(userid: string, name: string): Promise<UserData> {
    name = name.toLowerCase();

    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          name: name,
        },
      });
      return updatedUser;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException(`name "${name}" already token, try different one.`);
      }
      throw e;
    }
  }
}
