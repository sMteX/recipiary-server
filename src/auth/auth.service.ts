import * as _ from 'lodash';
import { Injectable, BadRequestException } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import { PasswordsHelper } from 'src/utils/passwords.helper';
import {User} from "../database/entities/user.entity";
import {UserInterface} from "./interfaces/user";
import {JwtPayload, LoginResult} from "./interfaces/jwt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(data: UserInterface): Promise<LoginResult> {
        const user: User = await this.findByUsernameAndPass(data);

        if (user) {
            const sanitizedUser = _.omit(user, ['password']);
            const accessToken = this.jwtService.sign(sanitizedUser);

            return {
                accessToken,
                expiresIn: 3600
            };
        }

        throw new BadRequestException('User with given credentials not found.');
    }

    async register(user: UserInterface): Promise<void> {
        await this.usersService.register(user);
    }

    async findByUsernameAndPass(data: UserInterface): Promise<User> {
        let user: User = await this.usersService.findOne(data.username);

        if (user) {
            const valid = await PasswordsHelper.compare(data.password, user.password);

            if (!valid) {
                user = null;
            }
        }

        return user;
    }

    async validate(data: JwtPayload): Promise<User> {
        return await this.usersService.findOne(data.username);
    }
}
