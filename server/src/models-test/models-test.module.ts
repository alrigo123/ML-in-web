/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelTest } from "./models-test.entity";
import { ModelsTestController } from "./models-test.controller";
import { ModelsTestService } from "./models-test.service";

@Module({
  imports: [TypeOrmModule.forFeature([ModelTest])], // Registrar la entidad ModelTest con TypeORM
  exports: [ModelsTestService], // Make it available for other modules to use it.
  providers: [ModelsTestService],
  controllers: [ModelsTestController],
})
export class ModelsTestModule {}
