import { UserStatus } from "@prisma/client";

export type AcceptedFriendship = {
    id: string,
    since: Date,
    friend: {
        id: string,
        name: string,
        avatar: string,
        status: UserStatus,
    },
}
