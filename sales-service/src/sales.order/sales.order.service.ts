import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Item } from 'src/entities/item';
import { SalesOrder } from 'src/entities/sales.order';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SalesOrderService {
    
    constructor(
        @InjectRepository(SalesOrder) private readonly salesOrderRepository: Repository<SalesOrder>,
        @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
        private readonly customersService: CustomersService,
        private readonly productsService: ProductsService,
        private readonly connection: Connection
    ) {}

    public async invoice(token: string, cart: Item[]) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.startTransaction();

        try {
            const customer = await this.customersService.getCustomer(token);

            let salesOrder = new SalesOrder();
            salesOrder.customerId = customer.id;
            salesOrder.totalValue = 0;
    
            salesOrder = await queryRunner.manager.save(salesOrder);
            
            for (let item of cart) {
                const product = await this.productsService.getProduct(item.productId);
                if (!product) {
                    throw new HttpException('Product ID is invalid!', HttpStatus.BAD_REQUEST);
                }
    
                if (product.amount < item.amount) {
                    return new HttpException("Product "+ product.name +" doesn't have enough amount.", HttpStatus.BAD_REQUEST);
                }
                
                product.amount = product.amount - item.amount;
                salesOrder.totalValue += item.price * item.amount;

                const newItem = new Item();
                newItem.price = item.price;
                newItem.amount = item.amount;
                newItem.productId = product.id;
                newItem.salesOrderId = salesOrder.id;

                await queryRunner.manager.save(newItem);
            }
    
            await this.salesOrderRepository.save(salesOrder);
            
            return salesOrder;
            
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException('Error on save a new Sales Order: '+ error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await queryRunner.release();
        }
    }

    public async getList(user: any) {
        return await this.salesOrderRepository.find({
            where: { customerId: user.id }
        });
    }

}