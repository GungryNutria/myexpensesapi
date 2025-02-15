import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/models/user.entity";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";

@Controller('users')
export class UsersController {

    constructor(private readonly UserService: UserService) { }

    @Post()
    create(@Body() createUserDto: UserDto): Promise<User> {
        return this.UserService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(): Promise<User[]> {
        return this.UserService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.UserService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UserDto): Promise<User> {
        return this.UserService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.UserService.remove(id);
    }
}