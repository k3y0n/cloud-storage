import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'John Doe',
  })
  fullname: string;

  @ApiProperty({
    default: 'MySuperPassword1234$',
  })
  password: string;
}
