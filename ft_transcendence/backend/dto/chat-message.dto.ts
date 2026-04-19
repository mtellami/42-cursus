import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsUUID } from "class-validator";

export class WsChatMessageDto {
    @ApiProperty()
    @IsUUID()
    chatid: string;

    @ApiProperty()
    @IsString()
    content: string;
}

export class WsChatMessageHistoryDto {
    @ApiProperty()
    @IsUUID()
    chatid: string;

    @ApiProperty()
    @IsDateString()
    before: Date;
}
