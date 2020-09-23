import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersModule } from 'src/customers/customers.module';
import { Item } from 'src/entities/item';
import { SalesOrder } from 'src/entities/sales.order';
import { ProductsModule } from 'src/products/products.module';

import { SalesOrderController } from './sales.order.controller';
import { SalesOrderService } from './sales.order.service';

@Module({
    imports: [
        ProductsModule,
        CustomersModule,
        TypeOrmModule.forFeature([ SalesOrder, Item ])
    ],
    controllers: [ SalesOrderController ],
    providers: [ SalesOrderService ]
})
export class SalesOrderModule {}