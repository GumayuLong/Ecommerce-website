import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { loginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();
  async login(body: loginAuthDto, res): Promise<object> {
    let { email, pass_word } = body;
    let checkEmail = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      // let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
      if (checkEmail.pass_word) {
        let data = {
          id: checkEmail.id,
          email,
          user_name: checkEmail.user_name,
          role: checkEmail.role,
        };
        let token = this.jwtService.sign(
          { data: data },
          {
            expiresIn: this.configService.get('EXPIRES_IN'),
            secret: this.configService.get('SECRET_KEY'),
          },
        );
        return res.status(200).send({ token, data });
      }
      return res.status(404).send('Password is incorrect!');
    }
    return res.status(404).send('Email is not found!');
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
