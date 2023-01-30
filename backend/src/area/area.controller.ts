import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area-dto';
import { UpdateAreaDto } from './dto/update-area-dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  async getAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Patch(':id')
  async update(@IsUuidParam('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(id, updateAreaDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.areaService.remove(id);
  }
}
