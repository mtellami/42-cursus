import { ApiProperty } from "@nestjs/swagger";

export class UserSearchDataSwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string;
}
