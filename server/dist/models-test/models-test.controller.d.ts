import { ModelsTestService } from "./models-test.service";
import { ModelTest } from "./models-test.entity";
export declare class ModelsTestController {
    private modelService;
    constructor(modelService: ModelsTestService);
    findAll(): Promise<ModelTest[]>;
    findOne(id: number): Promise<ModelTest>;
    create(model: ModelTest): Promise<ModelTest>;
    update(id: number, model: Partial<ModelTest>): Promise<void>;
    delete(id: number): Promise<void>;
}
