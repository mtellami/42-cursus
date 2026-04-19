import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangeChatNameDto {
    @ApiProperty()
    @IsString()
    name: string
}
