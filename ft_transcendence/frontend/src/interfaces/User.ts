export enum  FriendshipStatus {
    friend,
    unfriend,
    blocked,
}

export interface MatchHistory {
    avatar?: string; // Name of the opponent
    player_score: number; // Score of the match
    opp_score : number;
  }
  
  export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    message?: string;
    isOnline: onlin;
    friendship?: FriendshipStatus;
    lastmatches?: MatchHistory[]; // Array of match history entries
  }
export enum  onlin {
    Online,
    Offline,
    InGame,
}

export enum twofact {
    enabled,
    disabled,
}

export interface my {
    id : string;
    name : string;
    avatarurl : string;
    level : number;
    wins : number; 
    losses : number;
    achievements  : [string];
    lastSeen :  string;
    status : onlin;
    two_af : twofact;
}

export interface usera {
    id : string,
    name : string
    avatar : string
    status : string
		level?: string
}

export enum status {
    NORMAL,
    MUTED,
    BANED
}

export enum FriendshipStatus {
    FRIEND = 'unfriend',
    SENT = 'cancel request',
    RECEIVED = 'accept friend',
    BLOCKED = 'unblock',
    NONE = 'add friend',
}

export interface UserProfile {
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
        status?: onlin;
    };
}
