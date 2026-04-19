export type LiveGameType = {
    id: string;
    sender: {
        id: string;
        name: string;
				avatar: string,
				level: number,
    }
    receiver: {
        id: string;
        name: string;
				avatar: string,
				level: number,
    }
}
