import { ApiProperty } from "@nestjs/swagger";

class User {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string
}

export class DirectMessageSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    sender: User;
    @ApiProperty()
    receiver: User;
}
