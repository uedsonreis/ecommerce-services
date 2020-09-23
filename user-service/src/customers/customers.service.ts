import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly userService: UsersService,
    ) {}

    public async getByUserId(userId: number): Promise<Customer> {
        return await this.customerRepository.findOne({ where: { userId } });
    }

    public async save(customer: Customer): Promise<Customer> {
        if (customer.email === undefined || customer.email === null) {
            throw new HttpException("Email must be informed!", HttpStatus.BAD_REQUEST);
        }
        if (customer.name === undefined || customer.name === null) {
            throw new HttpException("Name must be informed!", HttpStatus.BAD_REQUEST);
        }
        if (customer.age < 18) {
            throw new HttpException("Customer must be an adult!", HttpStatus.BAD_REQUEST);
        }
        if (customer.user.password === undefined || customer.user.password === null) {
            throw new HttpException("Password must be input!", HttpStatus.BAD_REQUEST);
        }

        let itAlreadySaved = await this.customerRepository.findOne({
            where: { email: customer.email }
        });

        if (itAlreadySaved) {
            throw new HttpException("Customer email is already registered!", HttpStatus.BAD_REQUEST);
        }

        const savedUser = await this.userService.createUserCustomer(customer.email, customer.user.password);
        customer.userId = savedUser.id;
        const { user, ...newCustomer } = customer;

        return await this.customerRepository.save(newCustomer);
    }

}
