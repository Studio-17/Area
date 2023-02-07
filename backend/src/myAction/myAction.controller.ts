import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { IsUuidParam } from '../utils/decorators/Is-uuid-param.decorator';
import { MyActionService } from './myAction.service';
import { CreateMyActionDto } from './dto/create-myaction-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@ApiTags('MyAction')
@UseGuards(JwtAuthenticationGuard)
@Controller('area/:id/')
export class MyActionController {
  constructor(private readonly myActionService: MyActionService) {}

  @Post('action/')
  async addAction(
    @IsUuidParam('id') id: string,
    @Body() action: CreateMyActionDto,
    @Req() request: any,
  ) {
    return this.myActionService.addAction(id, action, request.user.userId, request.user);
  }

  @Delete('action/:actionId')
  async deleteAction(@IsUuidParam('actionId') actionId: string, @Req() request: any) {
    return this.myActionService.removeAction(actionId, request.user.userId);
  }
}
