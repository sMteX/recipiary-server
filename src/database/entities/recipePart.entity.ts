import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { RecipeIngredient } from './recipeIngredient.entity';

@Entity()
export class RecipePart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    order: number; // can be 0 based, maybe doesn't even matter

    @ManyToOne(type => Recipe, recipe => recipe.parts, { onDelete: 'CASCADE' })
    recipe: Recipe;

    @OneToMany(type => RecipeIngredient, pair => pair.recipePart)
    ingredients: RecipeIngredient[];
}
