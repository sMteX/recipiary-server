import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../utils/constants";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./auth.controller";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret, // TODO
            signOptions: { expiresIn: 3600 }
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
