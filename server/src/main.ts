/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 7000;
  await app.listen(port);
  console.log("LISTEN ON PORT: ", port)
}
void bootstrap();
