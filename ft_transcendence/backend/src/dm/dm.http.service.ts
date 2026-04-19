import { BadRequestException, Injectable } from "@nestjs/common";
import { DirectMessage } from "datatype/direct-message.type";
import { PrismaService } from "src/common/prisma/prisma.service";
import { FriendshipService } from "src/friendship/friendship.service";

@Injectable()
export class DmService {
  constructor(private prisma: PrismaService, private friendship: FriendshipService) {}

  async getAllDirectMessages(userid: string): Promise<DirectMessage[]> {
    return await this.prisma.dm.findMany({
      where: {
        OR: [
          { senderid: userid, },
          { receiverid: userid, }
        ],
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
						level: true,
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
						level: true,
          }
        },
      },
      orderBy: {
        updateAt: 'desc',
      },
    });
  }

  async newDirectMessage(myid: string, userid: string): Promise<DirectMessage> {
    const alreadyDm = await this.prisma.dm.findFirst({
      where: {
        OR: [
          {
            senderid: myid,
            receiverid: userid,
          },
          {
            senderid: userid,
            receiverid: myid,
          }
        ],
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
      },
    });
    if (alreadyDm) {
      return alreadyDm;
    }

    if (await this.friendship.isHeBlockedMe(myid, userid)) {
      throw new BadRequestException('user trying to dm was not found');
    }
    if (await this.friendship.isIBlockedHim(myid, userid)) {
      throw new BadRequestException('you blocked this user, unblock them to start new dm');
    }
    const newdm = await this.prisma.dm.create({
      data: {
        senderid: myid,
        receiverid: userid,
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        },
      },
    });
    return newdm;
  }
}
