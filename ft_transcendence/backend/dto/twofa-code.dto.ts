import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Length } from "class-validator";

export class TwofaCodeDto {
    @ApiProperty()
    @IsNumberString()
    @Length(6, 6)
    code: string
}
