import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action-dto';
import { UpdateActionDto } from './dto/update-action-dto';
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "../authentication/guards/jwt-authentication.guard";

@ApiTags('Action')
@UseGuards(JwtAuthenticationGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post(':serviceId')
  async create(
    @IsUuidParam('serviceId') serviceId: string,
    @Body() createActionDto: CreateActionDto,
  ) {
    return this.actionService.create(serviceId, createActionDto);
  }

  @Get()
  async getAll() {
    return this.actionService.findAll();
  }

  @Get('/service/:serviceId')
  async getByService(@IsUuidParam('serviceId') serviceId: string) {
    return this.actionService.findByService(serviceId);
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.actionService.findOne(id);
  }

  @Patch(':id')
  async update(@IsUuidParam('id') id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionService.update(id, updateActionDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.actionService.remove(id);
  }
}
