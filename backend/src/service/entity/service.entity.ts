import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

export enum ServiceList {
  DISCORD = 'discord',
  GITHUB = 'github',
  GOOGLE = 'google',
  MIRO = 'miro',
  NOTION = 'notion',
  SPOTIFY = 'spotify',
  TWITCH = 'twitch',
}

export enum ServiceType {
  INTERNAL = 'internal', // doesn't need to log in
  EXTERNAL = 'external', // do need to log in
}

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryColumn({ type: 'enum', enum: ServiceList })
  name!: ServiceList;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: ServiceType })
  type!: ServiceType;

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
