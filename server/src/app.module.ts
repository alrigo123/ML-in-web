/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Import Entities
import { Usuario } from "./usuario/usuario.entity";
import { ModelTest } from "./models-test/models-test.entity";

// Import Modules
import { UsuarioModule } from "./usuario/usuario.module";
import { PredictModule } from "./predict/predict.module";
import { ModelsTestModule } from "./models-test/models-test.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306, // Puerto de MySQL en XAMPP
      username: "root", // Usuario de MySQL
      password: "", // Contraseña (deja vacío si no tienes contraseña en XAMPP)
      database: "ml-models", // Nombre de tu base de datos
      entities: [Usuario, ModelTest], // Class for te DB Tables
    }),
    UsuarioModule,
    PredictModule, // Calls python API to get the model result
    ModelsTestModule, // Importa el módulo de modelos (funciones CRUD [tanto de services como module])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
