import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ User ]) ],
    providers: [ UsersService ],
    exports: [ UsersService ]
})
export class UsersModule {

    constructor(private connection: Connection) {
        const repository = this.connection.getRepository(User);
        const admin = repository.create({
            username: 'admin',
            password: 'reis',
            admin: true
        });
        console.log('ID: ', admin.id);
    }

}