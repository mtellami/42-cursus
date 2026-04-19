import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "@prisma/client";

class friend {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    status: UserStatus;
};

export class AcceptedFriendshipSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    since: Date;
    @ApiProperty()
    friend: friend;
}
