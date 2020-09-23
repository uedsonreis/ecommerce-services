import { Module, HttpModule } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Module({
    imports: [ HttpModule ],
    providers: [ CustomersService ],
    exports: [ CustomersService ]
})
export class CustomersModule {}