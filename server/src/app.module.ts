/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Import Entities
import { ModelTest } from "./models-test/models-test.entity";

// Import Modules
import { PredictModule } from "./predict/predict.module";
import { ModelsTestModule } from "./models-test/models-test.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306, // Puerto de MySQL en XAMPP
      username: "root", // Usuario de MySQL
      password: "", // Contraseña (deja vacío si no tienes contraseña en XAMPP)
      database: "ml-models", // Nombre de tu base de datos
      entities: [ModelTest], // Class for te DB Tables
    }),
    PredictModule, // Calls python API to get the model result
    ModelsTestModule, UsersModule, // Importa el módulo de modelos (funciones CRUD [tanto de services como module]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
