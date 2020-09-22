import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {

    constructor(private readonly authService: AuthService) {}

    @Post('user/login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() request: any) {
        return this.authService.login(request.user);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() request: any) {
        return request.user;
    }

}