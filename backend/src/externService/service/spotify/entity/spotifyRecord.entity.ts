import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'spotify-record' })
export class SpotifyRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  userId: string;

  @Column()
  category: string;

  @Column()
  content: string;

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
