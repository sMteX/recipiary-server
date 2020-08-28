import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // TODO: photo? (or randomly picked from recipes in given category)

    @ManyToOne(type => Category, category => category.children, { onDelete: 'CASCADE' })
    parent: Category;

    @OneToMany(type => Category, category => category.parent)
    children: Category[];

    @ManyToMany(type => Recipe, recipe => recipe.categories)
    recipes: Recipe[];
}
