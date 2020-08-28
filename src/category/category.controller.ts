import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
// import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('add')
    async add(@Body() data: CategoryDTO) {
        await this.categoryService.create(data);
    }

    @Post('addMore')
    async addMore(@Body() data: { categories: CategoryDTO[] }) {
        await this.categoryService.createMore(data.categories);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.findById(id);
    }

    @Get()
    async findAll() {
        return await this.categoryService.getAll();
    }

    @Post('update')
    async update(@Body() data: CategoryDTO) {
        await this.categoryService.update(data);
    }

    @Post('delete')
    async delete(@Body() data: CategoryDTO) {
        await this.categoryService.delete(data.id);
    }
}
