import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../database/entities/ingredient.entity';
import { IngredientController } from './ingredient.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ingredient])
    ],
    providers: [IngredientService],
    controllers: [IngredientController],
    exports: [IngredientService]
})
export class IngredientModule {}
