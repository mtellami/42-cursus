import { ChatMemberRole, ChatMemberStatus, ChatStatus, UserStatus } from "@prisma/client";

export type ChatData = {
    role: ChatMemberRole,
    status: ChatMemberStatus,
    createdAt: Date,
    mutedUntil: Date,
    chat: {
        id: string,
        name: string,
        avatar: string,
        status: ChatStatus,
    },
};

export type ChatMemberData = {
    role: ChatMemberRole,
    user: {
        id: string,
        name: string,
        avatar: string,
        status: UserStatus,
    },
}