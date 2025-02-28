/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) { }
  
  /* CRUD FUNCTIONS - FOR THE USER */
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<void> {
    await this.usuarioRepo.update(id, usuario);
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepo.delete(id);
  }
}
