import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Credentials } from './entities/credentials.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialRepository: Repository<Credentials>,
  ) {}

  public async findAll(): Promise<Credentials[]> {
    return await this.credentialRepository.find();
  }

  public async findById(email: string, service: string): Promise<Credentials> {
    const credentials = await this.credentialRepository.findOneBy({
      email: email,
      service: service,
    });

    if (!credentials) {
      throw new NotFoundException(`Credentials for #${email} not found`);
    }

    return credentials;
  }

  public async createCredentialsUser(credentialsDto: CredentialsDto): Promise<any> {
    try {
      return await this.credentialRepository.save(credentialsDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCredentialsUser(
    email: string,
    service: string,
    updateCredentialsDto: UpdateCredentialsDto,
  ): Promise<UpdateResult> {
    try {
      const credentials = await this.credentialRepository.update(
        {
          email: email,
          service: service,
        },
        { ...updateCredentialsDto },
      );

      if (!credentials) {
        throw new NotFoundException(`User #${email} does not exist`);
      }

      return credentials;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteCredentialsUser(email: string, service: string): Promise<void> {
    const credentials = await this.findById(email, service);
    await this.credentialRepository.remove(credentials);
  }
}
