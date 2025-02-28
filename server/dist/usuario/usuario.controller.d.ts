import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    create(usuario: Usuario): Promise<Usuario>;
    update(id: number, datos: Partial<Usuario>): Promise<void>;
    delete(id: number): Promise<void>;
}
