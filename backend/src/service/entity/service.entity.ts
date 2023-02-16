import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export enum ServiceType {
  DISCORD = 'discord',
  GITHUB = 'github',
  GOOGLE = 'google',
  MIRO = 'miro',
  NOTION = 'notion',
  SPOTIFY = 'spotify',
  TWITCH = 'twitch',
}

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryColumn()
  name!: string;

  @Column()
  description!: string;

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
