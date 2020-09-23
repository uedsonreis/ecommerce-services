import { HttpModule, Module } from '@nestjs/common';
import { ProductsService } from './products.service';

@Module({
    imports: [ HttpModule ],
    providers: [ ProductsService ],
    exports: [ ProductsService ]
})
export class ProductsModule {}
