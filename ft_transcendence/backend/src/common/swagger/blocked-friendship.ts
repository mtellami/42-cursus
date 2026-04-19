import { ApiProperty } from "@nestjs/swagger";

class receiver {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
};

export class BlockedFriendshipSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    since: Date;
    @ApiProperty()
    receiver: receiver;
}
