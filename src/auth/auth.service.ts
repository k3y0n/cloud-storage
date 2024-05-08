import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | null>> {
    try {
      const user = await this.userService.findByEmail(email);

      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create(dto);

      return userData;
    } catch (error) {
      throw new ForbiddenException('Error while register');
    }
  }
}
