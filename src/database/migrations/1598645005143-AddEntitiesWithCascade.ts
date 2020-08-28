import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntitiesWithCascade1598645005143 implements MigrationInterface {
    name = 'AddEntitiesWithCascade1598645005143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" SERIAL NOT NULL, "order" integer NOT NULL, "content" character varying NOT NULL, "recipeId" integer, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredient" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "unit" character varying NOT NULL, "comment" character varying NOT NULL, "recipePartId" integer, "ingredientId" integer, CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_part" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "recipeId" integer, CONSTRAINT "PK_f548acdbc87113ad69e2046c532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "portions" integer NOT NULL, "preparationTime" integer NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_category" ("recipeId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_d6a2dad2052866d7af741dafd49" PRIMARY KEY ("recipeId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e2c8741a606a3eb15302bed70" ON "recipe_category" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a94ab495765ad778b082503167" ON "recipe_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_e50600a62b8ece3b996d58331f4" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_84fa6390dd3b5c1adf4cb19b5c0" FOREIGN KEY ("recipePartId") REFERENCES "recipe_part"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_2879f9317daa26218b5915147e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_part" ADD CONSTRAINT "FK_99de7a1d8d61e9ede4316229b4e" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_8e2c8741a606a3eb15302bed707" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_a94ab495765ad778b0825031675" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_a94ab495765ad778b0825031675"`);
        await queryRunner.query(`ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_8e2c8741a606a3eb15302bed707"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`ALTER TABLE "recipe_part" DROP CONSTRAINT "FK_99de7a1d8d61e9ede4316229b4e"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_2879f9317daa26218b5915147e7"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_84fa6390dd3b5c1adf4cb19b5c0"`);
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_e50600a62b8ece3b996d58331f4"`);
        await queryRunner.query(`DROP INDEX "IDX_a94ab495765ad778b082503167"`);
        await queryRunner.query(`DROP INDEX "IDX_8e2c8741a606a3eb15302bed70"`);
        await queryRunner.query(`DROP TABLE "recipe_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "recipe_part"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
