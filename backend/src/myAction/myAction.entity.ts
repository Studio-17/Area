import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'myAction' })
export class MyAction {
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
}
