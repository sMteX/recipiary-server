import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, CategoryModule, IngredientModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
