import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ChatidDto {
    @ApiProperty()
    @IsUUID()
    chatid: string;
}
