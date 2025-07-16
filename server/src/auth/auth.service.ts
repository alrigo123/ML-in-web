/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";

import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ password, email, name }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException("Email already exists");
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const data = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        return {
            message: "User created successfully",
        };
    }

    async login({ identifier, password }: LoginDto) {
        // Try to find by email OR name
        const user = await this.usersService.findOneByIdentifier(identifier);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { name: user.name, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user: {
                email: user.email,
                name: user.name,
            },
        };
    }

}