import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CredentialsService } from './credentials.service';
import { CredentialsInterface } from './interface/credentials.interface';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { CreateCredentialsDto } from './dto/create-credentials.dto';

@ApiTags('Credentials')
// @UseGuards(JwtAuthenticationGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  // @Get('/all')
  // public async findAllUser(): Promise<CredentialsInterface[]> {
  //   return this.credentialsService.findAll();
  // }

  @Get()
  public async findOneCredentials(
    @Param('userId') userId: string,
    @Param('service') service: string,
  ): Promise<CredentialsInterface> {
    return this.credentialsService.findById(userId, service);
  }

  @Post()
  public async createCredentials(
    @Res() res,
    @Body() credentialsDto: CreateCredentialsDto,
  ): Promise<any> {
    try {
      console.log('credentialsDto');
      console.log(credentialsDto);
      const credentials = await this.credentialsService.createCredentialsUser(credentialsDto);

      return res.status(HttpStatus.OK).json({
        message: credentials,
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Credentials not created!',
        status: 400,
      });
    }
  }

  @Put()
  public async updateCredentials(
    @Res() res,
    @Param('userId') userId: string,
    @Param('service') service: string,
    @Body() credentialsUpdateDto: UpdateCredentialsDto,
  ): Promise<any> {
    try {
      await this.credentialsService.updateCredentialsUser(userId, service, credentialsUpdateDto);

      return res.status(HttpStatus.OK).json({
        message: 'Credentials Updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Credentials not updated!',
        status: 400,
      });
    }
  }

  @Delete()
  public async deleteCredentials(
    @Param('userId') userId: string,
    @Param('service') service: string,
  ): Promise<void> {
    const credentials = this.credentialsService.deleteCredentialsUser(userId, service);
    if (!credentials) {
      throw new NotFoundException(`Credentials for user #${userId} does not exist!`);
    }
    return credentials;
  }
}
