import { IsEnum } from 'class-validator';
import { ServiceList } from '../entity/service.entity';

export class IsServiceDto {
  @IsEnum(ServiceList)
  serviceName: ServiceList;
}
