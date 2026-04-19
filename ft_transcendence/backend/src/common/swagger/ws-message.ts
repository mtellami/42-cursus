import { ApiProperty } from "@nestjs/swagger";

class user {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name?: string;
    @ApiProperty()
    avatar?: string;
}

export class WsMessageSwagger {
    @ApiProperty()
    sender: user | undefined;
    @ApiProperty()
    chatid: string;
    @ApiProperty()
    at: Date;
    @ApiProperty()
    content: string;
}
