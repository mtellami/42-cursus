import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn } from "class-validator";

export class TrueStatusDto {
    @ApiProperty()
    @IsBoolean()
    @IsIn([true], { message: 'status must be true, only true', })
    status: boolean
}
