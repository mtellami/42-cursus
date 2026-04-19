import { ApiProperty } from "@nestjs/swagger";

class LiveGameUser {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
};

export class LiveGameSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    sender: LiveGameUser;
    @ApiProperty()
    receiver: LiveGameUser;
}
