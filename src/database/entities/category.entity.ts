import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe} from './recipe.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Category, category => category.children)
    parent: Category;

    @OneToMany(type => Category, category => category.parent)
    children: Category[];

    @ManyToMany(type => Recipe, recipe => recipe.categories)
    recipes: Recipe[];
}
