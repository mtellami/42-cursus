export type DirectMessage = {
    id: string;
    sender: {
        id: string;
        name: string;
        avatar: string;
    };
    receiver: {
        id: string;
        name: string;
        avatar: string;
    };
}
