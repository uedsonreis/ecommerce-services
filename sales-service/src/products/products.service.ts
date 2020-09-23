import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ProductsService {

    private static readonly URL = 'http://localhost:3002/products/';

    constructor(private readonly http: HttpService) {}

    public async getProduct(productId: number) {
        const response = await this.http.get(ProductsService.URL+productId).toPromise();
        return response.data;
    }

}