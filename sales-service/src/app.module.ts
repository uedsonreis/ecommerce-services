import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesOrderModule } from './sales.order/sales.order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        SalesOrderModule,
        TypeOrmModule.forRoot(),
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {}