import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import { ServiceList } from '../../service/entity/service.entity';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @IsNotEmpty()
  @IsEnum(ServiceList)
  service!: ServiceList;

  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsString()
  @IsOptional()
  refreshToken!: string;
}
