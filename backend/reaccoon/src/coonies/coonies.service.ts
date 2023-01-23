import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Coonies } from './coonies.entity';
// import { CreateCooniesDto } from './dto/create-coonies-dto';
// import { UpdateCooniesDto } from './dto/update-coonies-dto';
// import { NotFoundException } from '../utils/exceptions/not-found.exception';

@Injectable()
export class CooniesService {
  // constructor(
  //   @InjectRepository(Coonies)
  //   private cooniesRepository: Repository<Coonies>,
  // ) {}

  /*async create(createCooniesDto: CreateCooniesDto) {
    const coonies: Coonies = this.cooniesRepository.create(createCooniesDto);
    return await this.cooniesRepository.save(coonies);
  }

  async findAll() {
    return this.cooniesRepository.find();
  }

  async findOne(coonieId: string) {
    const res = this.cooniesRepository
      .findOneByOrFail({ uuid: coonieId })
      .catch((e) => {
        console.error(e);
        // throw NotFoundException('coonie');
      });
    if (!res) {
      // throw NotFoundException('coonie');
    }
    return res;
  }

  async update(coonieId: string, updateCooniesDto: UpdateCooniesDto) {
    this.cooniesRepository
      .update({ uuid: coonieId }, updateCooniesDto)
      .catch((e) => {
        console.error(e);
        // throw NotFoundException('coonie');
      });
    return this.findOne(coonieId);
  }

  async remove(coonieId: string) {
    const result = await this.cooniesRepository
      .delete({ uuid: coonieId })
      .catch((e) => {
        console.error(e);
        // throw NotFoundException('coonie');
      });
    return "coonie has been successfully deleted";
    // return result.affected + ' coonie has been successfully deleted';
  }*/
}
