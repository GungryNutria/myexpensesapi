import { BadRequestException, Body, Controller, Delete, Get, Injectable, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/models/user.entity";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { LoginDto } from "src/dtos/login.dto";

@Controller('user')
export class UsersController {

    constructor(private readonly UserService: UserService) { }

    @Post()
    create(@Body() createUserDto: UserDto): Promise<User> {
        return this.UserService.create(createUserDto);
    }

    @Post('login')
    login(@Body() LoginDto: LoginDto): Promise<UserDto> {
        return this.UserService.login(LoginDto);
    }
}