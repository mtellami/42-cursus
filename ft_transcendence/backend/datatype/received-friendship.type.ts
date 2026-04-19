export type ReceivedFriendship = {
    id: string,
    since: Date,
    sender: {
        id: string,
        name: string,
        avatar: string,
        level: number,
    },
}
