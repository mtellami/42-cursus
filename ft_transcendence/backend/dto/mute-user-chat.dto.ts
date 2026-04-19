import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';

export class MuteUserChatDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(10000)
    duration: number
}
