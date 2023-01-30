import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area-dto';
import { UpdateAreaDto } from './dto/update-area-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyActionService } from 'src/myAction/myAction.service';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const area: Area = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(area);
  }

  async findAll() {
    return this.areaRepository.find();
  }

  async findOne(areaId: string) {
    const res = this.areaRepository.findOneByOrFail({ uuid: areaId }).catch((e) => {
      console.error(e);
      throw NotFoundException('area');
    });
    if (!res) {
      throw NotFoundException('area');
    }
    const myActions = await this.myActionService.findAll(areaId);
    console.log(myActions);
    return { area: res, myActions: myActions };
  }

  async update(areaId: string, updateAreaDto: UpdateAreaDto) {
    await this.areaRepository.update({ uuid: areaId }, updateAreaDto).catch((e) => {
      console.error(e);
      throw NotFoundException('area');
    });
    return this.findOne(areaId);
  }

  async remove(areaId: string) {
    const result = await this.areaRepository.delete({ uuid: areaId }).catch((e) => {
      console.error(e);
      throw NotFoundException('area');
    });
    return result.affected + ' area has been successfully deleted';
  }

  async exist(areaId: string): Promise<boolean> {
    return this.areaRepository.exist({ where: { uuid: areaId } });
  }
}
