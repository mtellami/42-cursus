import { ApiProperty } from "@nestjs/swagger";
import { ChatStatus } from "@prisma/client";
import { IsEnum, IsOptional, Length, Matches } from "class-validator";

export class ChangeChatPrivacyDto {
    @ApiProperty({enum: ['PUBLIC', 'PRIVATE', 'PROTECTED']})
    @IsEnum(ChatStatus)
    status:     ChatStatus

    @ApiProperty()
    @IsOptional()
    @Length(5, 50)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    //     { message: 'password must have at least one digit, lowercase, uppercase',}
    // )
    password?: string
}
