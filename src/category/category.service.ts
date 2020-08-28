import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) {}

    async create(data: CategoryDTO) {
        const category = new Category();
        category.name = data.name;

        if (data.parentId) {
            const parent = await this.categoryRepository.findOne(data.parentId);
            if (parent) {
                category.parent = parent;
            }
        }

        await this.categoryRepository.save(category);
    }

    // TODO: addTree?

    async createMore(categories: CategoryDTO[]) {
        const categoryPromises = categories.map(async c => {
            const category = new Category();
            category.name = c.name;

            if (c.parentId) {
                const parent = await this.categoryRepository.findOne(c.parentId);
                if (parent) {
                    category.parent = parent;
                }
            }
            return category;
        });
        const newCategories = await Promise.all(categoryPromises);
        await this.categoryRepository.save(newCategories);
    }

    async findById(id: number) {
        return await this.categoryRepository.findOne({
            where: {
                id
            },
            relations: ['parent'] // TODO: works?
        });
    }

    async getAll() {
        return await this.categoryRepository.find({ relations: ['parent'] }); // TODO: works?
    }

    async update(newCategory: CategoryDTO) {
        if (!newCategory.id) {
            throw new BadRequestException('Category must be specified.');
        }
        const category = await this.findById(newCategory.id);
        if (!category) {
            throw new BadRequestException('Category not found.');
        }

        category.name = newCategory.name; // TODO: check for emptiness

        if (newCategory.parentId && newCategory.parentId !== category.parent.id) {
            const newParent = await this.categoryRepository.findOne(newCategory.parentId);
            if (newParent) {
                category.parent = newParent;
            }
        }
        await this.categoryRepository.save(category);
    }

    async delete(id: number) {
        const category = await this.findById(id);
        if (!category) {
            throw new BadRequestException('Category not found.');
        }

        await this.categoryRepository.delete(category);
    }
}
