import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuarioService {
    private readonly usuarioRepo;
    constructor(usuarioRepo: Repository<Usuario>);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    create(usuario: Usuario): Promise<Usuario>;
    update(id: number, usuario: Partial<Usuario>): Promise<void>;
    delete(id: number): Promise<void>;
}
