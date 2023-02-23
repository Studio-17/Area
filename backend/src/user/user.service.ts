import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserInterface } from './interface/user.interface';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async findById(userId: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({
      uuid: userId,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  public async create(userDto: UserDto): Promise<UserInterface> {
    try {
      return await this.userRepository.save(userDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async updateByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ email: email });
      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async updateByPassword(email: string, password: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ email: email });
      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async updateProfileUser(uuid: string, userProfileDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ uuid: uuid });
      user.firstName = userProfileDto.firstName;
      user.lastName = userProfileDto.lastName;
      user.email = userProfileDto.email;

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async updateUser(uuid: string, userUpdateDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        {
          uuid: uuid,
        },
        { ...userUpdateDto },
      );

      if (!user) {
        throw new NotFoundException(`User #${uuid} does not exist`);
      }

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async deleteUser(uuid: string): Promise<void> {
    const user = await this.findById(uuid);
    await this.userRepository.remove(user);
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.exist({ where: { email: email } });
  }

  async existByUserId(userId: string): Promise<boolean> {
    return this.userRepository.exist({ where: { uuid: userId } });
  }
}
