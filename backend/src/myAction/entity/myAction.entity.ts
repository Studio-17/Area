import { Params } from 'src/cron/type/param.type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'myAction' })
export class MyActionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  userId!: string;

  @Column()
  areaId!: string;

  @Column()
  actionId!: string;

  @Column({ nullable: true })
  linkedFromId!: string;

  @Column({ type: 'json', nullable: true })
  params: Params;

  @Column({ nullable: true })
  second: string;

  @Column({ nullable: true })
  minute: string;

  @Column({ nullable: true })
  hour: string;

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
