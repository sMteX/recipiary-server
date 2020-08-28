import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { Recipe } from '../database/entities/recipe.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Recipe])
    ],
    providers: [RecipeService],
    controllers: [RecipeController],
    exports: [RecipeService]
})
export class RecipeModule {}
