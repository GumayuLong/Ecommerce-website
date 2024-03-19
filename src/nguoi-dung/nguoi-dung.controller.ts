import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('NguoiDung')
@Controller('/api/nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Get()
  fetchUser(@Res() res): object {
    return this.nguoiDungService.fetchUser(res);
  }

  @Post()
  create(@Body() createNguoiDungDto: CreateNguoiDungDto) {
    return this.nguoiDungService.create(createNguoiDungDto);
  }

  @Get()
  findAll() {
    return this.nguoiDungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
  ) {
    return this.nguoiDungService.update(+id, updateNguoiDungDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nguoiDungService.remove(+id);
  }
}
