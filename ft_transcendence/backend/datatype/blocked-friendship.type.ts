export type BlockedFriendship = {
    id: string,
    since: Date,
    receiver: {
        id: string,
        name: string,
        avatar: string,
    },
}
