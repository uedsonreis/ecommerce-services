import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Factory } from 'src/entities/factory';

@Injectable()
export class FactoriesService {

    constructor(
        @InjectRepository(Factory)
        private readonly factoriesRepository: Repository<Factory>
    ) {}

    public async save(factory: Factory): Promise<Factory> {
        return await this.factoriesRepository.save(factory)
    }

    public async getList(filter?: any): Promise<Factory[]> {
        return await this.factoriesRepository.find({
            where: { ...filter }
        })
    }

}
