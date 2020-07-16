import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import  { ExtractJwt, Strategy } from 'passport-jwt';
import {jwtConstants} from "./constants";
import {AuthService, JwtPayload} from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validate(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
