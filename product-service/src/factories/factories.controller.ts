import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { Factory } from 'src/entities/factory';
import { FactoriesService } from './factories.service';

@Controller('factories')
export class FactoriesController {

    constructor(private readonly factoriesService: FactoriesService) {}

    @Get()
    public async index(@Query() query: any) {
        return await this.factoriesService.getList(query)
    }

    @Post()
    public async create(@Body() factory: Factory) {
        return await this.factoriesService.save(factory)
    }

}