import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService    
    ) {}

    public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result as User;
        }
        return null;
    }

    public login(user: User): string {
        const payload = { username: user.username, sub: user.admin };
        return this.jwtService.sign(payload);
    }

}