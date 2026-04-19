import {status} from '../interfaces/User'

export interface usera {
    id : string,
    name : string
    avatar : string
    status : string
}

export interface Friends {
    id : string;
    since  : string;
    friend : usera;
}

export interface grouplist {
    role : role,
    user : usera
};

export enum role {
    OWNER= 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER= 'MEMBER',
}

export enum chatStatus {
		PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    PROTECTED = 'PROTECTED'
}

export interface grp {
    id : string;
    name : string;
    avatar : string;
    status : chatStatus;
}


export interface chat {
    id : string;
    name : string;
    avatar: string;
    status : chatStatus;
}
export enum stateType {
	PRIVATE = 'PRIVATE' ,
    PUBLIC = 'PUBLIC',
    PROTECTED = 'PROTECTED'
}

export interface listofgroup {
    role : string;
    status : status;
    createdAt : string;
    mutedUntil : string;
    chat : chat;
}


export interface ChatContent  {
    sender: {
        id: string;
        name?: string;
        avatar?: string;
    } | undefined;
    chatid: string,
    at: Date;
    content: string;
}

