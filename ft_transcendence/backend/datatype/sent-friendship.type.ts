export type SentFriendship = {
    id: string,
    since: Date,
    receiver: {
        id: string,
        name: string,
        avatar: string,
        level: number,
    },
}
