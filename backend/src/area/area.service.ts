import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaEntity } from './entity/area.entity';
import { CreateAreaDto } from './dto/create-area-dto';
import { UpdateAreaDto } from './dto/update-area-dto';
import { NotFoundException } from '../utils/exceptions/not-found.exception';
import { MyActionService } from 'src/myAction/myAction.service';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,
    @Inject(forwardRef(() => MyActionService))
    private readonly myActionService: MyActionService,
  ) {}

  async create(createAreaDto: CreateAreaDto, userId: string): Promise<AreaEntity> {
    const area: AreaEntity = this.areaRepository.create({ ...createAreaDto, userId: userId });
    const areaInData = await this.areaRepository.save(area);
    const action = await this.myActionService.addAction(
      areaInData.uuid,
      {
        actionId: createAreaDto.action.id,
        linkedFromId: null,
        hour: createAreaDto.hour,
        minute: createAreaDto.minute,
        second: createAreaDto.second,
        params: createAreaDto.action.params,
      },
      userId,
    );
    for (const myAction of createAreaDto.reactions) {
      await this.myActionService.addAction(
        areaInData.uuid,
        {
          actionId: myAction.id,
          linkedFromId: action.uuid,
          hour: createAreaDto.hour,
          minute: createAreaDto.minute,
          second: createAreaDto.second,
          params: myAction.params ? myAction.params : null,
        },
        userId,
      );
    }
    return areaInData;
  }

  async findAll(userId: string): Promise<AreaEntity[]> {
    const areas = await this.areaRepository.findBy({ userId: userId });
    const results = [];
    for (const area of areas) {
      const myAction = await this.myActionService.findAction(area.uuid);
      if (!myAction) {
        results.push({ area, action: null, reactions: null });
        continue;
      }
      const myReactions = await this.myActionService.findReaction(area.uuid, myAction.myActionId);
      results.push({ area, action: myAction, reactions: myReactions });
    }
    return results;
  }

  async findOne(areaId: string, userId: string): Promise<any> {
    const res = await this.areaRepository
      .findOneByOrFail({ uuid: areaId, userId: userId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('area');
      });
    if (!res) {
      throw NotFoundException('area');
    }
    const myAction = await this.myActionService.findAction(areaId);
    const myReactions = await this.myActionService.findReaction(areaId, myAction.myActionId);
    return { res, action: myAction, reactions: myReactions };
  }

  async update(areaId: string, updateAreaDto: UpdateAreaDto, userId: string): Promise<AreaEntity> {
    await this.areaRepository.update({ uuid: areaId, userId: userId }, updateAreaDto).catch((e) => {
      console.error(e);
      throw NotFoundException('area');
    });
    return this.findOne(areaId, userId);
  }

  async remove(areaId: string, userId: string): Promise<string> {
    this.myActionService.removeByAreaId(areaId, userId);
    const result = await this.areaRepository.delete({ uuid: areaId, userId: userId }).catch((e) => {
      console.error(e);
      throw NotFoundException('area');
    });
    return result.affected + ' area has been successfully deleted';
  }

  async exist(areaId: string): Promise<boolean> {
    return this.areaRepository.exist({ where: { uuid: areaId } });
  }
}
