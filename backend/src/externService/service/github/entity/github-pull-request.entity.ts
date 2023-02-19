import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'github-pull-request' })
export class GithubPullRequestEntity {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  email: string;

  @Column()
  repositoryOwner: string;

  @Column()
  repositoryName: string;

  @Column()
  pullRequestId: string;

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
