import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { AreaEntity } from './entity/area.entity';
import {UserId} from "../utils/decorators/user-id.decorator";

@ApiTags('Area')
@UseGuards(JwtAuthenticationGuard)
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto, @Req() request: any): Promise<AreaEntity> {
    return this.areaService.create(createAreaDto, request.user.userId);
  }

  @Get()
  async getAll(@Req() request: any): Promise<AreaEntity[]> {
    return this.areaService.findAll(request.user.userId);
  }

  @Get(':areaId')
  async getOne(@IsUuidParam('areaId') areaId: string, @Req() request: any): Promise<any> {
    return this.areaService.findOne(areaId, request.user.userId);
  }

  @Patch(':areaId')
  async update(
    @IsUuidParam('areaId') areaId: string,
    @Body() updateAreaDto: UpdateAreaDto,
    @UserId() userId: string,
  ): Promise<AreaEntity> {
    return this.areaService.update(areaId, updateAreaDto, userId);
  }

  @Delete(':areaId')
  async delete(@IsUuidParam('areaId') areaId: string, @Req() request: any): Promise<string> {
    return this.areaService.remove(areaId, request.user.userId);
  }
}
