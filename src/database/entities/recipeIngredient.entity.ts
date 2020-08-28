import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecipePart } from './recipePart.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class RecipeIngredient {
    // composite would be cleaner but w/e
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    unit: string; // TODO: enum?

    @Column()
    comment: string;

    @ManyToOne(type => RecipePart, part => part.ingredients)
    recipePart: RecipePart;

    @ManyToOne(type => Ingredient, ingredient => ingredient.recipes)
    ingredient: Ingredient;
}
