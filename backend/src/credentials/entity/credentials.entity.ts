import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceList } from '../../service/entity/service.entity';

@Entity({ name: 'credential' })
export class CredentialsEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  userId: string;

  @Column()
  service: ServiceList;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
