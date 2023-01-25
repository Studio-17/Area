import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area-dto';
import { UpdateAreaDto } from './dto/update-area-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const area: Area = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(area);
  }

  async findAll() {
    return this.areaRepository.find();
  }

  async findOne(areaId: string) {
    const res = this.areaRepository
      .findOneByOrFail({ uuid: areaId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('area');
      });
    if (!res) {
      throw NotFoundException('area');
    }
    return res;
  }

  async update(areaId: string, updateAreaDto: UpdateAreaDto) {
    await this.areaRepository
      .update({ uuid: areaId }, updateAreaDto)
      .catch((e) => {
        console.error(e);
        throw NotFoundException('area');
      });
    return this.findOne(areaId);
  }

  async remove(areaId: string) {
    const result = await this.areaRepository
      .delete({ uuid: areaId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('area');
      });
    return result.affected + ' area has been successfully deleted';
  }
}
