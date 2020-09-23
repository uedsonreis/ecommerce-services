import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Customer } from './customers/customer.entity';
import { CustomersService } from './customers/customers.service';
import { User } from './users/user.entity';

@Controller('users')
export class AppController {

    constructor(
        private readonly authService: AuthService,
        private readonly customersService: CustomersService
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() request: any) {
        return this.authService.login(request.user);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() request: any) {
        return request.user.username;
    }

    @Post('customers')
    async addCustomer(@Body() customer: Customer) {
        const savedCustomer = await this.customersService.save(customer);
        return this.authService.login(
            { username: savedCustomer.email, id: savedCustomer.userId } as User
        );
    }

}