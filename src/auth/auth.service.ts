import { User } from './../users/entities/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

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

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      throw new ForbiddenException('Error while register');
    }
  }

  async login(user: User) {
    try {
      return {
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      throw new ForbiddenException('Error while login');
    }
  }
}
