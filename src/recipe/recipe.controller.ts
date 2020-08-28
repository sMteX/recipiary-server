import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { RecipeService } from './recipe.service';
// import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}
}
