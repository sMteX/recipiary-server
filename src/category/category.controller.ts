import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CategoryService } from './category.service';
// import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
}
