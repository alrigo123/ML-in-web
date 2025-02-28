"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsTestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_test_entity_1 = require("./models-test.entity");
const typeorm_2 = require("typeorm");
let ModelsTestService = class ModelsTestService {
    modelRepo;
    constructor(modelRepo) {
        this.modelRepo = modelRepo;
    }
    async findAll() {
        return this.modelRepo.find();
    }
    async findOne(id) {
        const model = await this.modelRepo.findOne({ where: { id } });
        if (!model) {
            throw new Error(`Modelo con ID ${id} no encontrado`);
        }
        return model;
    }
    async create(model) {
        return this.modelRepo.save(model);
    }
    async update(id, model) {
        await this.modelRepo.update({ id }, model);
    }
    async delete(id) {
        await this.modelRepo.delete(id);
    }
};
exports.ModelsTestService = ModelsTestService;
exports.ModelsTestService = ModelsTestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_test_entity_1.ModelTest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ModelsTestService);
//# sourceMappingURL=models-test.service.js.map