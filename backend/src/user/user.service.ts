import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      uuid: +userId,
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
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateProfileUser(uuid: string, userProfileDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ uuid: +uuid });
      user.firstName = userProfileDto.firstName;
      user.lastName = userProfileDto.lastName;
      user.email = userProfileDto.email;

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUser(uuid: string, userUpdateDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      const user = await this.userRepository.update(
        {
          uuid: +uuid,
        },
        { ...userUpdateDto },
      );

      if (!user) {
        throw new NotFoundException(`User #${uuid} does not exist`);
      }

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(uuid: string): Promise<void> {
    const user = await this.findById(uuid);
    await this.userRepository.remove(user);
  }
}
