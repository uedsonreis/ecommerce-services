import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactoriesService } from 'src/factories/factories.service';
import { Factory } from 'src/entities/factory';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly factoriesService: FactoriesService
    ) {}

    public async save(product: Product): Promise<Product> {
        if (!product.factoryId && product.factory) {
            if (product.factory.id) {
                product.factoryId = product.factory.id;
            } else if (product.factory.name) {
                let factory = undefined;
                
                const factories = await this.factoriesService.getList({ name: product.factory.name });

                if (factories.length < 1) {
                    factory = await this.factoriesService.save(product.factory);
                } else {
                    factory = factories[0]
                }
                product.factoryId = factory.id;
            }
        }

        product.factory = undefined;
        return await this.productsRepository.save(product);
    }

    public async getList(filter?: any): Promise<Product[]> {
        return await this.productsRepository.find({
            where: { ...filter }
        });
    }

    public async delete(product: Product): Promise<void> {
        await this.productsRepository.delete(product);
    }

}
