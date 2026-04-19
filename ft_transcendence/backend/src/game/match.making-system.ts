import { Injectable } from "@nestjs/common";
import { SocketUser } from "datatype/socket-ws.type";

@Injectable()
export class MatchMakingSystem {
    private peers: SocketUser[] = [];

    public onDisconect(socket: SocketUser): void {
        this.removePeer(socket);
    }

    public addPeer(socket: SocketUser): void {
        this.peers.push(socket);
    }

    public removePeer(socket: SocketUser): void {
        const index = this.peers.indexOf(socket, 0);
        if (index > -1) {
            this.peers.splice(index, 1);
        }
    }

    public getTwoPeers(): {sender: SocketUser, receiver: SocketUser} | null {
        if (this.peers.length < 2) {
            return null;
        }
        const sender: SocketUser = this.peers.shift();
        const receiver: SocketUser = this.peers.shift();
        return sender.user.id !== receiver.user.id ? { sender, receiver } : null;
    }
}
