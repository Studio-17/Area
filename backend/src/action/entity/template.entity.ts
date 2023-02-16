import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { ServiceList } from '../../service/entity/service.entity';
import { ActionType } from './action.entity';

@Entity({ name: 'template' })
export class TemplateEntity {
  @PrimaryColumn()
  templateId!: string;

  @Column({ type: 'enum', enum: ActionType })
  type!: ActionType;

  @Column({ type: 'enum', enum: ServiceList })
  service!: ServiceList;

  @Column()
  name!: string;

  @Column()
  description!: string;

  // @Column()
  // link!: string;

  // @Column('text', { array: true, nullable: true })
  // params: [{ name: string; type: string; description: string }];

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
