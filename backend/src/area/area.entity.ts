import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'area' })
export class Area {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  userId!: string;

  @Column({ nullable: true })
  name: string;
}