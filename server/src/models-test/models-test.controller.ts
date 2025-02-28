/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ModelsTestService } from "./models-test.service";
import { ModelTest } from "./models-test.entity";

@Controller("models")
export class ModelsTestController {
    constructor(private modelService: ModelsTestService) { }

    @Get()
    findAll() {
        return this.modelService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.modelService.findOne(id);
    }

    @Post()
    create(@Body() model: ModelTest){
        return this.modelService.create(model)
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() model: Partial<ModelTest>) {
        return this.modelService.update(id, model)
    }

    @Delete(":id")
    delete(@Param("id") id:number){
        return this.modelService.delete(id)
    }

}
