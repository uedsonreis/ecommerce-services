import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { FactoriesService } from './factories/factories.service';
import { FactoriesController } from './factories/factories.controller';
import { Factory } from './entities/factory';
import { Product } from './entities/product';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ Factory, Product ]),
        AuthModule
    ],
    controllers: [ ProductsController, FactoriesController ],
    providers: [ ProductsService, FactoriesService ],
})
export class AppModule {
    
    constructor(private connection: Connection) {}

}