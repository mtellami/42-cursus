import { UserStatus } from "@prisma/client";

export enum FriendshipStatus {
    FRIEND = 'unfriend',
    SENT = 'cancel request',
    RECEIVED = 'accept friend',
    BLOCKED = 'unblock',
    NONE = 'add friend',
}

export type UserData = {
    id: string;
    name: string;
    avatar: string;
    level: number;
    wins: number;
    losses: number;
    achievements: string[];
    lastSeen?: Date;
    status?: UserStatus;
}

export type UserProfile = {
    id?:  string;
    since?:  Date;
    status: FriendshipStatus;
    user: {
        id: string;
        name: string;
        avatar: string;
        level: number;
        wins: number;
        losses: number;
        achievements: string[];
        lastSeen?: Date;
        status?: UserStatus;
    };
}
