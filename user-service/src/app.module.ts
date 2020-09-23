import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersService } from './customers/customers.service';
import { CustomersModule } from './customers/customers.module';

@Module({
    imports: [
        AuthModule, UsersModule, CustomersModule,
        TypeOrmModule.forRoot(),
    ],
    controllers: [ AppController ],
})
export class AppModule {}
