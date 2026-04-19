import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class ResInvitGameDto {
    @ApiProperty()
    @IsUUID()
    id: string;
    @ApiProperty()
    @IsBoolean()
    accept: boolean;
}
