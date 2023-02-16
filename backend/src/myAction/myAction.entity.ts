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

  @Column({ type: 'json', nullable: true })
  params: { name: string; content: string }[];

  @Column({ nullable: true })
  second: string;

  @Column({ nullable: true })
  minute: string;

  @Column({ nullable: true })
  hour: string;
}
