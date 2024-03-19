import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }

  prisma = new PrismaClient();

  async validate(tokenDecode: any) {
    let { id, email, user_name } = tokenDecode.data;
    let checkEmail = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return true;
    }
    // console.log(tokenDecode);
    return false;
  }
}
