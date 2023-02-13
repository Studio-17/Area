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

  public async findByService(service: string): Promise<Credentials[]> {
    const credentials = await this.credentialRepository.findBy({
      service: service,
    });
    return credentials;
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
    console.log(credentialsDto);
    try {
      const isExisting = await this.credentialRepository.exist({
        where: { service: credentialsDto.service, email: credentialsDto.email },
      });
      if (isExisting) {
        return await this.updateCredentialsUser(credentialsDto.email, credentialsDto.service, {
          accessToken: credentialsDto.accessToken,
          refreshToken: credentialsDto.refreshToken,
        });
      }
      return await this.credentialRepository.save(credentialsDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
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
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async deleteCredentialsUser(email: string, service: string): Promise<void> {
    const credentials = await this.findById(email, service);
    await this.credentialRepository.remove(credentials);
  }
}
