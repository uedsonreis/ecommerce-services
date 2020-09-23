import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Item } from 'src/entities/item';

import { SalesOrderService } from './sales.order.service';

@Controller('sales/orders')
export class SalesOrderController {

    constructor(private readonly salesOrderService: SalesOrderService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public async store(@Request() request: any, @Headers('Authorization') token: string, @Body() items: Item[]) {
        const { user } = request;
        
        if (user.admin) throw new HttpException("User must be a Customer to invoice a Sales Order!", HttpStatus.FORBIDDEN);

        if (!items || items.length < 1) {
            throw new HttpException("Items are required to invoice a Sales Order!", HttpStatus.FORBIDDEN);
        }

        return await this.salesOrderService.invoice(token, items);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async index(@Request() request: any) {
        const { user } = request;

        if (user.admin) throw new HttpException("User must be a Customer to get the sales orders!", HttpStatus.FORBIDDEN);
    
        return await this.salesOrderService.getList(user);
    }

}