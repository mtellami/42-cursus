import { ApiProperty } from "@nestjs/swagger";
import { Length, Matches } from "class-validator";

export class ChangeChatPasswordDto {
    @ApiProperty()
    @Length(5, 50)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    //     { message: 'password must have at least one digit, lowercase, uppercase',}
    // )
    password: string
}
