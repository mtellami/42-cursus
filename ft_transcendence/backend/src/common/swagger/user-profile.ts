import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "@prisma/client";
import { FriendshipStatus } from "datatype/user-profile.type";

export class UserDataSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    level: number;
    @ApiProperty()
    wins: number;
    @ApiProperty()
    losses: number;
    @ApiProperty()
    achievements: string[];
    @ApiProperty({ required: false, })
    lastSeen: Date;
    @ApiProperty({ required: false, enum: ["Online", "Offline", "InGame"] })
    status: UserStatus;
}

export class UserProfileSwagger {
    @ApiProperty({ required: false, })
    id:  string;
    @ApiProperty({ required: false, })
    since:  Date;
    @ApiProperty({ enum: ['un-friend', 'cancel request', 'accept friend', 'un-block', 'add friend'] })
    status: FriendshipStatus;
    @ApiProperty()
    user: UserDataSwagger;
}
