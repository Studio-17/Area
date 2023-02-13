import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area-dto';
import { UpdateAreaDto } from './dto/update-area-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@ApiTags('Area')
@UseGuards(JwtAuthenticationGuard)
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto, @Req() request: any) {
    return this.areaService.create(createAreaDto, request.user.userId);
  }

  @Get()
  async getAll(@Req() request: any) {
    return this.areaService.findAll(request.user.userId);
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string, @Req() request: any) {
    return this.areaService.findOne(id, request.user.userId);
  }

  @Patch(':id')
  async update(
    @IsUuidParam('id') id: string,
    @Body() updateAreaDto: UpdateAreaDto,
    @Req() request: any,
  ) {
    return this.areaService.update(id, updateAreaDto, request.user.userId);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string, @Req() request: any) {
    return this.areaService.remove(id, request.user.userId);
  }
}
