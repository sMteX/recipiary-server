import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
// import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('ingredient')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {}
}
