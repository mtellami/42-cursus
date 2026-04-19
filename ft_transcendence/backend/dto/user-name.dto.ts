import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class UserNameDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'name must contain just (a-z, A-Z, 0-9, -)' })
  // @Matches(/^(^-|---)/g, { message: "name can't contain sequence of '-' or '-' at begin" })
  @Length(5, 25)
  name: string;
}
