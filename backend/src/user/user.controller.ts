import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
// @UseGuards(JwtAuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // COMMENTED BECAUSE OF SECURITY : USER DATS ISN'T ACCESSIBLE FROM OTHER USERS
  // @Get()
  // public async findAllUser(): Promise<UserEntity[]> {
  //   return this.usersService.findAll();
  // }

  // COMMENTED BECAUSE OF SECURITY : USER DATS ISN'T ACCESSIBLE FROM OTHER USERS
  // @Get('/:id')
  // public async findOneUser(@Param('id') id: string): Promise<UserEntity> {
  //   return this.usersService.findById(id);
  // }

  @Get('/:id/profile')
  public async getUser(@Res() res, @Param('id') id: string): Promise<UserEntity> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      user: user,
      status: 200,
    });
  }

  @Put('/:id/profile')
  public async updateProfileUser(
    @Res() res,
    @Param('id') id: string,
    @Body() userProfileDto: CreateUserDto,
  ): Promise<any> {
    try {
      await this.usersService.updateProfileUser(id, userProfileDto);

      return res.status(HttpStatus.OK).json({
        message: 'User Updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateUser(
    @Res() res,
    @Param('id') id: string,
    @Body() userUpdateDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      await this.usersService.updateUser(id, userUpdateDto);

      return res.status(HttpStatus.OK).json({
        message: 'User Updated successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    const user = this.usersService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }
}
