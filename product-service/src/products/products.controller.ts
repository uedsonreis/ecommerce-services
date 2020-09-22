import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { Product } from 'src/entities/product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    public async index(@Query() query: any) {
        return await this.productsService.getList(query)
    }

    @Post()
    public async create(@Body() product: Product) {
        return await this.productsService.save(product)
    }

}