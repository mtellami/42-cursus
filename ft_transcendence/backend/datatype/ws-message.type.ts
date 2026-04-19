export type WsMessageType = {
    sender: {
        id: string;
        name: string;
        avatar: string;
    } | undefined;
    chatid: string,
    at: Date;
    content: string;
}
