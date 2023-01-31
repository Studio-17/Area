import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ActionType {
  ACTION = 'action',
  REACTION = 'reaction',
}

@Entity({ name: 'action' })
export class Action {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  serviceId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  link!: string;

  @Column({ type: 'enum', enum: ActionType, default: ActionType.ACTION })
  type!: ActionType;
}
