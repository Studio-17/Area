import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'service' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;
}
