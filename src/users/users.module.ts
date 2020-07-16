import { Module } from '@nestjs/common';
import { UsersService } from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule], // I don't get the TypeOrmModule here but it doesn't load TypeORM dependencies in UsersService without it...
})
export class UsersModule {}
