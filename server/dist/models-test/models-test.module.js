"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsTestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const models_test_entity_1 = require("./models-test.entity");
const models_test_controller_1 = require("./models-test.controller");
const models_test_service_1 = require("./models-test.service");
let ModelsTestModule = class ModelsTestModule {
};
exports.ModelsTestModule = ModelsTestModule;
exports.ModelsTestModule = ModelsTestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([models_test_entity_1.ModelTest])],
        exports: [models_test_service_1.ModelsTestService],
        providers: [models_test_service_1.ModelsTestService],
        controllers: [models_test_controller_1.ModelsTestController],
    })
], ModelsTestModule);
//# sourceMappingURL=models-test.module.js.map