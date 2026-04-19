import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsDateString } from 'class-validator'

export class DateDto {
    @ApiProperty()
    @IsDateString()
    dat: Date
}
