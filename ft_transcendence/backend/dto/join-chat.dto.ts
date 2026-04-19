import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID, Length } from "class-validator";

export class JoinChatDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsOptional()
    @Length(5, 50, { message: 'invalid password' })
    password?: string
}
