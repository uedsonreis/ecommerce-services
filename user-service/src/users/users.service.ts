import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    public async createUserCustomer(username: string, password: string): Promise<User> {
        return await this.repository.save(
            { username, password, admin: false } as User
        );
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        return this.repository.findOne({ where: { username } });
    }

}