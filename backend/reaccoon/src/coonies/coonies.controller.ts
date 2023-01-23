import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
// import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
// import { CooniesService } from './coonies.service';
// import { CreateCooniesDto } from './dto/create-coonies-dto';
// import { UpdateCooniesDto } from './dto/update-coonies-dto';

@Controller('coonies')
export class CooniesController {
  // constructor(private readonly cooniesService: CooniesService) {}

  @Get()
  async hello() {
    return 'hello';
  }
  // @Post()
  // async create(@Body() createCooniesDto: CreateCooniesDto) {
  //   return this.cooniesService.create(createCooniesDto);
  // }

  // @Get()
  // async getAll() {
  //   return this.cooniesService.findAll();
  // }

  // @Get(':id')
  // async getOne(@IsUuidParam('id') id: string) {
  //   return this.cooniesService.findOne(id);
  // }

  // @Patch(':id')
  // async update(
  //   @IsUuidParam('id') id: string,
  //   @Body() updateCooniesDto: UpdateCooniesDto,
  // ) {
  //   return this.cooniesService.update(id, updateCooniesDto);
  // }

  // @Delete()
  // async delete(@IsUuidParam('id') id: string) {
  //   return this.cooniesService.remove(id);
  // }
}
