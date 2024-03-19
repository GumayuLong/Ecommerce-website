import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NguoiDungService {
  create(createNguoiDungDto: CreateNguoiDungDto) {
    return 'This action adds a new nguoiDung';
  }

  findAll() {
    return `This action returns all nguoiDung`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nguoiDung`;
  }

  update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
    return `This action updates a #${id} nguoiDung`;
  }

  remove(id: number) {
    return `This action removes a #${id} nguoiDung`;
  }

  prisma = new PrismaClient();
  async fetchUser(res): Promise<object> {
    try {
      let getData = await this.prisma.users.findMany();
      return res.status(200).send(getData);
    } catch {
      return res.status(404).send('User not found!');
    }
  }
}
