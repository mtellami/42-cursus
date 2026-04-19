import { Socket } from "socket.io";

type User = {
    user: {
        id: string,
    },
}

type Game = {
    game: {
        paddel: number,
    }
}

export type SocketUser = Socket & User & Game;
