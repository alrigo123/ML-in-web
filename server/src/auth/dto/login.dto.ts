/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class LoginDto {

  @IsString()
  identifier: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}