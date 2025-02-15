import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(createUserDto: UserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
      }
    
      async findAll(): Promise<User[]> {
        return await this.userRepository.find();
      }
    
      async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
      }
    
      async update(id: number, updateUserDto: UserDto): Promise<User> {
        const user = await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
}