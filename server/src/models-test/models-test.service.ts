/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ModelTest } from "./models-test.entity";
import { Repository } from "typeorm";

@Injectable()
export class ModelsTestService {
    constructor(
        @InjectRepository(ModelTest)
        private modelRepo: Repository<ModelTest>,
    ) { }

    /* CRUD FUNCTIONS FOR THE MODEL */
    async findAll(): Promise<ModelTest[]> {
        return this.modelRepo.find();
    }

    async findOne(id: number): Promise<ModelTest> {
        const model = await this.modelRepo.findOne({ where: { id } });
        if (!model) {
            throw new Error(`Modelo con ID ${id} no encontrado`)
        }
        return model;
    }

    async create(model: ModelTest): Promise<ModelTest> {
        return this.modelRepo.save(model);
    }

    async update(id: number, model: Partial<ModelTest>): Promise<void> {
        await this.modelRepo.update({ id }, model);
    }

    async delete(id: number): Promise<void> {
        await this.modelRepo.delete(id);
      }

}
