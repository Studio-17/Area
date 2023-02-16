import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {ServiceList} from "../../service/entity/service.entity";

export enum ActionType {
  ACTION = 'action',
  REACTION = 'reaction',
}

@Entity({ name: 'action' })
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ type: 'enum', enum: ServiceList })
  service!: ServiceList;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column()
  link!: string;

  @Column({ type: 'enum', enum: ActionType })
  type!: ActionType;

  @Column('text', { array: true, nullable: true })
  params: [{ name: string; type: string; description: string }];

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
