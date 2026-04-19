import { ApiProperty } from "@nestjs/swagger";
import { ChatMemberRole, ChatMemberStatus, ChatStatus, UserStatus } from "@prisma/client";

export class ChatSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty({ enum: ["PUBLIC", "PRIVATE", "PROTECTED"] })
    status: ChatStatus;
};

class User {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty({ enum: ["Online", "Offline", "InGame"] })
    status: UserStatus;
};

export class ChatDataSwagger {
    @ApiProperty({ enum: ["OWNER", "ADMIN", "MEMBER", "NOROLE"] })
    role: ChatMemberRole;
    @ApiProperty({ enum: ["NORMAL", "MUTED", "BANED"] })
    status: ChatMemberStatus;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    mutedUntil: Date;
    @ApiProperty()
    chat: ChatSwagger;
};

export class ChatMemberDataSwagger {
    @ApiProperty({ enum: ["OWNER", "ADMIN", "MEMBER", "NOROLE"] })
    role: ChatMemberRole;
    @ApiProperty()
    user: User;
}
