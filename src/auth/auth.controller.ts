import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService, UserInterface} from "./auth.service";
import {JwtAuthGuard} from "./jwtAuth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: UserInterface) {
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: UserInterface) {
        return this.authService.register(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    test() {
        return 'Logged in';
    }
}
