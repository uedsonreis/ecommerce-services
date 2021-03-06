import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from './jwt.constants';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: constants.ignoreExpiration,
            secretOrKey: constants.secret,
        });
    }

    validate(payload: any): User {
        return { id: payload.id, username: payload.username, admin: payload.admin } as User;
    }

}