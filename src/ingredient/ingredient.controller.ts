import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDTO } from './ingredient.dto';
// import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('ingredient')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}

    @Post('add')
    async add(@Body() data: IngredientDTO) {
        await this.ingredientService.create(data.name);
    }

    @Post('addMore')
    async addMore(@Body() data: { ingredients: IngredientDTO[] }) {
        await this.ingredientService.createMore(data.ingredients.map(i => i.name));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.ingredientService.findById(id);
    }

    @Get()
    async findAll() {
        return await this.ingredientService.getAll();
    }

    @Post('update')
    async update(@Body() data: IngredientDTO) {
        await this.ingredientService.update(data);
    }

    @Post('delete')
    async delete(@Body() data: IngredientDTO) {
        await this.ingredientService.delete(data.id);
    }
}
