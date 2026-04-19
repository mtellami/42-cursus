import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { LiveGameType } from 'datatype/live-game.type';
import { GameHistoryType } from 'datatype/game-history.type';

@Injectable()
export class GameHttpService {
  constructor(private prisma: PrismaService) {}

  async getAllLiveGames(): Promise<LiveGameType[]> {
    return await this.prisma.liveGame.findMany({
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
						avatar: true,
						level: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
						avatar: true,
						level: true,
          },
        },
      },
      orderBy: {
        sender: {
          level: 'desc',
        },
        receiver: {
          level: 'desc',
        }
      },
    });
  }

  async getLiveGame(userid: string): Promise<LiveGameType | undefined> {
    return await this.prisma.liveGame.findFirst({
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
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
						avatar: true,
						level: true,
          },
        },
      },
    });
  }

  async getAllGameHistory(userid: string): Promise<GameHistoryType[]> {
    return await this.prisma.gameHistory.findMany({
      where: {
        OR: [
          { loserid: userid, },
          { winnerid: userid, }
        ],
      },
      select: {
        id: true,
        winnerScore: true,
        loserScore: true,
        at: true,
        winner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        loser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        at: 'desc',
      }
    });
  }

  async getWinnedGameHistory(userid: string): Promise<GameHistoryType[]> {
    return await this.prisma.gameHistory.findMany({
      where: {
        winnerid: userid,
      },
      select: {
        id: true,
        winnerScore: true,
        loserScore: true,
        at: true,
        winner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        loser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        at: 'desc',
      }
    });
  }

  async getLosedGameHistory(userid: string): Promise<GameHistoryType[]> {
    return await this.prisma.gameHistory.findMany({
      where: {
        loserid: userid,
      },
      select: {
        id: true,
        winnerScore: true,
        loserScore: true,
        at: true,
        winner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        loser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        at: 'desc',
      }
    });
  }
}
