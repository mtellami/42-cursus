import { ApiProperty } from "@nestjs/swagger";
import { ChatStatus } from "@prisma/client";
import { IsEnum, IsOptional, Length, Matches } from "class-validator";

export class CreateChatDto {
    @ApiProperty({ enum: ["PUBLIC", "PRIVATE", "PROTECTED"] })
    @IsEnum(ChatStatus)
    status:     ChatStatus

    @ApiProperty()
    @Length(3, 25)
    name: string

    @ApiProperty({ required: false })
    @IsOptional()
    @Length(5, 50)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    //     { message: 'password must have at least one digit, lowercase, uppercase',}
    // )
    password?: string
}
