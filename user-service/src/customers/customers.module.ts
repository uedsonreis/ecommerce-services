import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([ Customer ])
    ],
    providers: [ CustomersService ],
    exports: [ CustomersService ]
})
export class CustomersModule {}