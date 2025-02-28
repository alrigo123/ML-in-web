/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios') // Esto define el prefijo para los endpoints
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() datos: Partial<Usuario>) {
    return this.usuarioService.update(id, datos);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuarioService.delete(id);
  }
}
