import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdDto {
    @ApiProperty()
    @IsUUID()
    id: string;
}
