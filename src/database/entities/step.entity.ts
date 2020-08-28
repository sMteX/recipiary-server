import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe} from './recipe.entity';

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number;

    @Column()
    content: string;

    // TODO: photos

    @ManyToOne(type => Recipe, recipe => recipe.steps)
    recipe: Recipe;
}
