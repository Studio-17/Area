import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CredentialsEntity } from './entity/credentials.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { ServiceList } from '../service/entity/service.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(CredentialsEntity)
    private readonly credentialRepository: Repository<CredentialsEntity>,
  ) {}

  public async findAll(): Promise<CredentialsEntity[]> {
    return await this.credentialRepository.find();
  }

  public async findByService(service: ServiceList): Promise<CredentialsEntity[]> {
    const credentials: CredentialsEntity[] = await this.credentialRepository.findBy({
      service: service,
    });
    return credentials;
  }

  public async findById(userId: string, service: ServiceList): Promise<CredentialsEntity> {
    const credentials: CredentialsEntity = await this.credentialRepository.findOneBy({
      userId: userId,
      service: service,
    });

    if (!credentials) {
      throw new NotFoundException(`Credentials for #${userId} not found`);
    }

    return credentials;
  }

  public async createCredentialsUser(credentialsDto: CredentialsDto): Promise<any> {
    try {
      const isExisting: boolean = await this.credentialRepository.exist({
        where: { service: credentialsDto.service, userId: credentialsDto.userId },
      });
      if (isExisting) {
        return await this.updateCredentialsUser(credentialsDto.userId, credentialsDto.service, {
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
    userId: string,
    service: ServiceList,
    updateCredentialsDto: UpdateCredentialsDto,
  ): Promise<UpdateResult> {
    try {
      const credentials: UpdateResult = await this.credentialRepository.update(
        {
          userId: userId,
          service: service,
        },
        { ...updateCredentialsDto },
      );

      if (!credentials) {
        throw new NotFoundException(`User #${userId} does not exist`);
      }

      return credentials;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST, { cause: err });
    }
  }

  public async deleteCredentialsUser(userId: string, service: ServiceList): Promise<void> {
    const credentials: CredentialsEntity = await this.findById(userId, service);
    await this.credentialRepository.remove(credentials);
  }
}
