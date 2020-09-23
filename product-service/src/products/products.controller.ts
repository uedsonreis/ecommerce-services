import { Controller, Get, Post, Body, Query, UseGuards, Request, HttpException, HttpStatus, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Product } from 'src/entities/product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    public async index(@Query() query: any) {
        return await this.productsService.getList(query);
    }

    @Get(':id')
    public async get(@Param() params: any) {
        const productId = Number(params.id);
        return await this.productsService.getById(productId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public async create(@Request() request: any, @Body() product: Product) {
        const { user } = request;
        if (user.admin) {
            return await this.productsService.save(product);
        } else {
            throw new HttpException("User must be admin to save a new Product!", HttpStatus.FORBIDDEN);
        }
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    public async delete(@Request() request: any, @Body() product: Product) {
        const { user } = request;
        if (user.admin) {
            return await this.productsService.delete(product);
        } else {
            throw new HttpException("User must be admin to save a new Product!", HttpStatus.FORBIDDEN);
        }
    }

}