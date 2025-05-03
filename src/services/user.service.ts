import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { LoginDto } from "src/dtos/login.dto";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'; // o bcrypt

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(createUserDto: UserDto): Promise<User> {
        var newUser = plainToInstance(User, createUserDto);
        const user = this.userRepository.create(newUser);
        return await this.userRepository.save(user);
      }

      async login(userDto: LoginDto): Promise<UserDto> {
        const existUser = await this.userRepository.findOne({ where: { email: userDto.usernameOrEmail } });
        if (!existUser) {
            throw new UnauthorizedException(`User with username or email ${userDto.usernameOrEmail} not found`);
        }

        const isPasswordValid = await bcrypt.compare(userDto.password, existUser.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException(`Invalid password`);
        }
        const { password: _, ...result } = existUser;
        var newUser = plainToInstance(UserDto, result);
        return newUser;
      }
}