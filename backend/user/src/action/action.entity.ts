import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
