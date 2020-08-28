import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../database/entities/ingredient.entity';
import { IngredientDTO } from './ingredient.dto';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>
    ) {}

    async create(name: string) {
        const ingredient = new Ingredient();
        ingredient.name = name;

        await this.ingredientRepository.save(ingredient);
    }

    async createMore(names: string[]) {
        const ingredients = names.map(name => {
            const ingredient = new Ingredient();
            ingredient.name = name;
            return ingredient;
        });
        await this.ingredientRepository.save(ingredients);
    }

    async findById(id: number) {
        return await this.ingredientRepository.findOne(id);
    }

    async getAll() {
        return await this.ingredientRepository.find(); // TODO: works?
    }

    async update(newIngredient: IngredientDTO) {
        if (!newIngredient.id) {
            throw new BadRequestException('Ingredient must be specified.');
        }
        const ingredient = await this.findById(newIngredient.id);
        if (!ingredient) {
            throw new BadRequestException('Ingredient not found.');
        }

        ingredient.name = newIngredient.name; // TODO: check for emptiness
        await this.ingredientRepository.save(ingredient);
    }

    async delete(id: number) {
        const ingredient = await this.findById(id);
        if (!ingredient) {
            throw new BadRequestException('Ingredient not found.');
        }

        await this.ingredientRepository.delete(ingredient);
    }
}
