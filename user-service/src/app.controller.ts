import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('user/login')
    async login(@Request() request: any) {
        console.log(request)
        return this.authService.login(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() request: any) {
        return request.user;
    }

}