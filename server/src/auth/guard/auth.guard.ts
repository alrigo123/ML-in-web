/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constant';

/*
Si el método canActivate devuelve true, la solicitud se permite y continúa el flujo normal hacia el controlador asociado con la ruta.
Si el método canActivate devuelve false, se niega el acceso a la ruta protegida y la solicitud se detiene.
*/

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request as Request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token as string, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true // o Promise.resolve(false), dependiendo de la lógica de tu guard.
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = (request.headers as any).authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
