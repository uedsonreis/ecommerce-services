import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: constants.ignoreExpiration,
            secretOrKey: constants.secret,
        });
    }

    validate(payload: any): any {
        return { id: payload.id, username: payload.username, admin: payload.admin };
    }

}