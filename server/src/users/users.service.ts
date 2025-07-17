/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // async findOne(id: number): Promise<User> {
  //   const usuario = await this.usuarioRepo.findOne({ where: { id } });
  //   if (!usuario) {
  //     throw new Error(`Usuario con ID ${id} no encontrado`);
  //   }
  //   return usuario;
  // }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email: email })
  }

  async findOneByIdentifier(identifier: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: [
        { email: identifier },
        { name: identifier },
      ],
    });
  }

}
