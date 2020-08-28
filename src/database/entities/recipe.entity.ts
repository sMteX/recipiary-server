import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Step } from './step.entity';
import { RecipePart } from './recipePart.entity';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    portions: number;

    @Column()
    preparationTime: number;

    @ManyToMany(type => Category, category => category.recipes)
    @JoinTable({
        name: 'recipe_category',
        joinColumn: { name: 'recipeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' }
    })
    categories: Category[];

    @OneToMany(type => Step, step => step.recipe)
    steps: Step[];

    @OneToMany(type => RecipePart, part => part.recipe)
    parts: RecipePart[];

    // TODO: photos
}
