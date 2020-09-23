import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class CustomersService {

    private static readonly URL = 'http://localhost:3001/users/customers';

    constructor(private readonly http: HttpService) {}

    public async getCustomer(token: string) {
        const config = { headers: { Authorization: token } };
        const response = await this.http.get(CustomersService.URL, config).toPromise()
        return response.data;
    }

}