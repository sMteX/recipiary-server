import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/recipe.entity';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>
    ) {}
}
