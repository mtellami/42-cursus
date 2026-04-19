import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { LiveGameType } from "datatype/live-game.type";
import { SocketUser } from "datatype/socket-ws.type";
import { Server } from "socket.io";
import * as EVENTS from "src/common/constants/constants";
import { WsBadRequestException } from "src/common/exceptions/ws-custom.exception";
import { PrismaService } from "src/common/prisma/prisma.service";
import { gameManager } from './game.manager';
import { MatchMakingSystem } from "./match.making-system";
import { GameInvitations } from "./game.invitations";
import { WSService } from "src/websocket/websocket.service";
import { ResInvitGameDto } from "dto/response-to-invit-game.dto";

type SocketidGameid = {
    socket: SocketUser,
    gameid: string,
}

@Injectable()
export class GameWSService {
    constructor(
        @Inject(forwardRef(() => WSService)) private ws: WSService,
        private prisma: PrismaService,
        private matchMaking: MatchMakingSystem,
        private gameInvits: GameInvitations,
    ) {}

    private server: Server;
    private userGame: Map<string, SocketidGameid> = new Map<string, SocketidGameid>();
  
    onServerInit(server: Server): void {
      this.server = server;
    }
  
    async onDisconnect(socket: SocketUser): Promise<void> {
        if (this.userGame.get(socket.user.id).socket === socket) {
            this.userGame.delete(socket.user.id);
        }
        this.matchMaking.onDisconect(socket);
        this.gameInvits.onDisconect(socket);
    }

    findPeer(socket: SocketUser): void {
        if (this.userGame.has(socket.user.id)) {
            throw new WsBadRequestException('this account allready in game');
        }
        this.matchMaking.addPeer(socket);

        const peers: {sender: SocketUser, receiver: SocketUser} = this.matchMaking.getTwoPeers();
        if (peers) {
            this.setupNewGame(peers.sender, peers.receiver);
        }
    }

    async inviteToGame(socket: SocketUser, to: string): Promise<void> {
        if (socket.user.id === to) {
			    throw new WsBadRequestException('can\'t invite yourself');
		    }
        const userto = await this.prisma.user.findUnique({
            where: {
                id: to,
            },
            select: {
                status: true,
            }
        });
        if (!userto || userto.status !== 'Online') {
            throw new WsBadRequestException('User is ' + (userto ? userto.status : 'not found'));
        }

        const { status } = await this.prisma.user.findUnique({
            where: {
                id: socket.user.id,
            },
            select: {
                status: true,
            },
        });
        if (status !== 'Online') {
            throw new BadRequestException('you are in other game');
        }
        const gameInvit = await this.prisma.gameInvite.create({
            data: {
                senderid: socket.user.id,
                senderSocketId: socket.id,
                receiverid: to,
            },
            select: {
                id: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        this.ws.getUserSockets(to).map((socket) => {
            socket.emit(EVENTS.WS_GAME_EVENT_INVITE_GAME, gameInvit);
        });
    }

    async responseToInviteGame(receiver: SocketUser, res: ResInvitGameDto): Promise<void> {
    let invitGame: any;
		try {
			invitGame = await this.prisma.gameInvite.delete({
            where: {
                id: res.id,
            },
            select: {
                senderid: true,
                senderSocketId: true,
                receiverid: true,
                createAt: true,
            },
        });
		} catch {
			throw new WsBadRequestException('invuite game not found, id error');
		}    
        if (res.accept === false) {
            return ;
        }
        if (!invitGame || (new Date().getSeconds() - invitGame.createAt.getSeconds() > 10)) {
            throw new BadRequestException('Invite Game not found or timeout');
        }
        const sender = this.ws.getUserSockets(invitGame.senderid).find((sock) => sock.id === invitGame.senderSocketId);
        if (sender) {
            this.setupNewGame(sender, receiver);// don't await this function
        } else {
            throw new BadRequestException('user was disconnected');
        }
    }

    cancelFindPeer(socket: SocketUser): void {
        this.matchMaking.removePeer(socket);
    }

    async joinGame(socket: SocketUser, gameid: string): Promise<void> {
      const liveGame: LiveGameType = await this.prisma.liveGame.findUnique({
        where: {
          id: gameid,
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
      if (liveGame) {
        socket.join(gameid);
        socket.emit(EVENTS.WS_GAME_EVENT_JOIN_GAME, liveGame);
      } else {
        throw new WsBadRequestException('Live Game not found');
      }
    }

    leaveGame(socket: SocketUser, gameid: string): void {
        const socketGame = this.userGame.get(socket.user.id);
        if (socketGame.socket === socket && socketGame.gameid === gameid) {
            throw new WsBadRequestException("Can't leave Game, you are playing now");
        } else {
            socket.leave(gameid);
        }
    }

    movePaddel(socket: SocketUser, paddel: number): void {
        socket.game.paddel = paddel;
    }

    /** --------- PRIVATE Methodes ----------- */

    private async setupNewGame(sender: SocketUser, receiver: SocketUser): Promise<void> {
        const liveGame: LiveGameType = await this.createLiveGame(sender, receiver);
        this.userGame.set(sender.user.id, { socket: sender, gameid: liveGame.id });
        this.userGame.set(receiver.user.id, { socket: receiver, gameid: liveGame.id });
        const data = await gameManager(this.server, sender, receiver, liveGame);// all live game management in this function
        this.userGame.delete(sender.user.id);
        this.userGame.delete(receiver.user.id);
        await this.setGameHistory(
										data.winner,
										data.loser,
										liveGame, 
										Math.max(data.score1, data.score2), 
										Math.min(data.score1, data.score2)
												);
    }

    private async createLiveGame(
            sender: SocketUser, receiver: SocketUser
        ): Promise<LiveGameType> {

        const liveGame: LiveGameType = await this.prisma.liveGame.create({
            data: {
                senderid: sender.user.id,
                receiverid: receiver.user.id,
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
        if (!liveGame) {
            throw new WsBadRequestException('Ooops, can\'t create live game');
        }

        await this.prisma.user.updateMany({
          where: {
             id: {
                in: [sender.user.id, receiver.user.id]
				     },
			    },
			    data: {
              status: 'InGame',
			    },
		    });

        sender.join(liveGame.id);
        receiver.join(liveGame.id);
        sender.emit(EVENTS.WS_GAME_EVENT_JOIN_GAME, liveGame);
        receiver.emit(EVENTS.WS_GAME_EVENT_JOIN_GAME, liveGame);
        return liveGame;
    }

    private async setGameHistory(
            winner: string, loser: string,
            liveGame: LiveGameType, winnersSore: number, loserScore: number,
        ): Promise<void> {
        await this.prisma.liveGame.delete({
            where: {
                id: liveGame.id,
            },
        });

        const data = await this.prisma.gameHistory.create({
            data: {
                winnerid: winner,
                loserid: loser,
                winnerScore: winnersSore,
                loserScore: loserScore,
            },
			      select: {
              winner: {
					       select: {
								   status: true,
							  }
			        },
				      loser: {
					      select: {
                   status: true,
					      }
				      }
			      }
        });

				await this.prisma.user.update({
					where: {
						id: loser,
					},
					data: {
						losses: {
							increment: 1,
						},
				    status: (data.loser.status === 'InGame' ? 'Online' : 'Offline')
					}
				});

				await this.prisma.user.update({
					where: {
						id: winner,
					},
					data: {
						wins: {
							increment: 1,
						},
						level: {
							increment: (winnersSore - loserScore) * 5,
						},
				    status: (data.winner.status === 'InGame' ? 'Online' : 'Offline')
					},
				});
    }
}

