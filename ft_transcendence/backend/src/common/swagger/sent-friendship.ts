import { ApiProperty } from "@nestjs/swagger";

class user {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
};

export class SentFriendshipSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    since: Date;
    @ApiProperty()
    receiver: user;
}
