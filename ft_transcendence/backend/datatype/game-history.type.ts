export type GameHistoryType = {
    id: string;
    winnerScore: number;
    loserScore: number;
    at: Date;
    winner: {
        id: string;
        name: string;
        avatar: string;
    }
    loser: {
        id: string;
        name: string;
        avatar: string;
    }
}
