import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'coonies' })
export class Coonies {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;
}
