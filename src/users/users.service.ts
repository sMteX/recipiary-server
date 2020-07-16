import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../database/entities/user.entity";
import {UserInterface} from "../auth/auth.service";
import {PasswordsHelper} from "../utils/passwords.helper";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async register(user: UserInterface): Promise<void> {
        const newUser = new User();
        newUser.username = user.username;
        newUser.password = await PasswordsHelper.hash(user.password);

        await this.userRepository.save(newUser);
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                username
            }
        });
    }
}
