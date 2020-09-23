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
        repository.find().then(users => {
            if (!users || users.length < 1) {
                const user = repository.save({ username: 'admin', password: 'reis', admin: true });
                // repository.save({ username: 'john', password: 'changeme', admin: false });
                // repository.save({ username: 'chris', password: 'secret', admin: false });
                // repository.save({ username: 'maria', password: 'guess', admin: false });
            }
        });
    }
}