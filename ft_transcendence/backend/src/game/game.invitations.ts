import { Injectable } from "@nestjs/common";
import { SocketUser } from "datatype/socket-ws.type";

@Injectable()
export class GameInvitations {
    private peers: SocketUser[] = [];

    public onDisconect(socket: SocketUser): void {
    }
}
