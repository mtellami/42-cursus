import { Injectable } from "@nestjs/common";
import { SocketUser } from "datatype/socket-ws.type";
import { WsBadRequestException } from "src/common/exceptions/ws-custom.exception";
import { PrismaService } from "src/common/prisma/prisma.service";
import { MultiMap } from "src/common/utils/multi-map";

@Injectable()
export class WSService {
    constructor(private prisma: PrismaService) {}

    private readonly userSockets: MultiMap<SocketUser> = new MultiMap<SocketUser>();

    async onConnect(socket: SocketUser): Promise<void> {
        if (this.userSockets.get(socket.user.id).length === 0) {
			const user = await this.prisma.user.findUnique({
				where: {
						id: socket.user.id,
				},
				select : {
					id: true,
				}
			});
			if (!user) {
                return ;
				// throw new WsBadRequestException('you are not in our db, please clear you cookie for new start');
			}
			await this.prisma.user.update({
                where: {
                    id: socket.user.id,
                },
                data: {
                    status: 'Online',
            	    lastSeen: new Date(),
                },
            });
        }
        this.userSockets.add(socket.user.id, socket);
    }

    async onDisconnect(socket: SocketUser): Promise<void> {
        if (this.userSockets.get(socket.user.id).length === 1) {
            await this.prisma.user.update({
                where: {
                    id: socket.user.id,
                },
                data: {
                    status: 'Offline',
                    lastSeen: new Date(),
                },
            });
        }
        this.userSockets.delete(socket.user.id, socket);
    }

    getUserSockets(userid: string): SocketUser[] {
        return this.userSockets.get(userid);
    }
}
