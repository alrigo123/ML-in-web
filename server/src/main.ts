/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS permitiendo solicitudes desde http://localhost:3000
  app.enableCors({
    origin: '*', // Puedes especificar un array de orígenes o usar '*' para permitir todos (no recomendado en producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = 7000;
  await app.listen(port);
  console.log("LISTEN ON PORT: ", port)
}
void bootstrap();
