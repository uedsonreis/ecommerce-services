import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        AuthModule, UsersModule,
        TypeOrmModule.forRoot(),
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {}
