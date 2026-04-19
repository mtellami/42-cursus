 export enum ChatStatus {
  PUBLIC,
  PRIVATE,
  PROTECTED
}

export enum ChatMemberRole {
  OWNER,
  ADMIN,
  MEMBER,
  NOROLE
}

export enum ChatMemberStatus {
  NORMAL,
  MUTED,
  BANED
}
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
}

export type DirectMessage = {
    id: string;
    sender: {
        id: string;
        name: string;
        avatar: string;
		 		status: string;
    };
    receiver: {
        id: string;
        name: string;
        avatar: string;
		 		status: string;
    };
}

export type WsMessageType = {
    sender: {
        id: string;
        name?: string;
        avatar?: string;
    };
    chatid: string,
    at?: Date;
    content: string;
}
