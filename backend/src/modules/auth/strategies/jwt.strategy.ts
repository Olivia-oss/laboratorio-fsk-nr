import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookie?.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKet: process.env.JWT_SECRET,
    });
  }

  async validate(paylod: any) {
    return { id: paylod.id };
  }
}
