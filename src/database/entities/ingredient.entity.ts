import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './recipeIngredient.entity';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => RecipeIngredient, pair => pair.ingredient)
    recipes: RecipeIngredient[];
}
