import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer)
        private readonly repository: Repository<Customer>,
        private readonly userService: UsersService,
    ) {}

    public async save(customer: Customer): Promise<Customer> {
        if (customer.email === undefined || customer.email === null) {
            throw new Error("Email must be informed!");
        }
        if (customer.name === undefined || customer.name === null) {
            throw new Error("Name must be informed!");
        }
        if (customer.age < 18) {
            throw new Error("Customer must be an adult!");
        }
        if (customer.user.password === undefined || customer.user.password === null) {
            throw new Error("Password must be input!");
        }

        let itAlreadySaved = await this.repository.findOne({
            where: { email: customer.email }
        });

        if (itAlreadySaved) {
            throw new Error('Customer email is already registered!');
        }

        const savedUser = await this.userService.createUserCustomer(customer.email, customer.user.password);
        customer.userId = savedUser.id;
        const { user, ...newCustomer } = customer;

        return await this.repository.save(newCustomer);
    }

}
