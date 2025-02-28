import { ModelTest } from "./models-test.entity";
import { Repository } from "typeorm";
export declare class ModelsTestService {
    private modelRepo;
    constructor(modelRepo: Repository<ModelTest>);
    findAll(): Promise<ModelTest[]>;
    findOne(id: number): Promise<ModelTest>;
    create(model: ModelTest): Promise<ModelTest>;
    update(id: number, model: Partial<ModelTest>): Promise<void>;
    delete(id: number): Promise<void>;
}
