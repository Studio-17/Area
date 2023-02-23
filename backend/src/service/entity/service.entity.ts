import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

export enum ServiceList {
  DEEZER = 'deezer',
  DISCORD = 'discord',
  DROPBOX = 'dropbox',
  GITHUB = 'github',
  GITLAB = 'gitlab',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  MAILCHIMP = 'mailchimp',
  MIRO = 'miro',
  NOTION = 'notion',
  PINTEREST = 'pinterest',
  SOUNDCLOUD = 'soundcloud',
  SPOTIFY = 'spotify',
  TUMBLR = 'tumblr',
  TWITCH = 'twitch',
  TYPEFORM = 'typeform',
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
