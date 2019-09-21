import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Comment } from '../../social/entity/comment.entity';
import { Visit } from '../../social/entity/visit.entity';
import { Like } from '../../social/entity/like.entity';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  givenName: string;

  @Column({ nullable: true })
  familyName: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  picture: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  role: string[];

  @Column({ nullable: true })
  provider: string;

  @CreateDateColumn()
  joinDate: Date;

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(type => Visit, visit => visit.user)
  visits: Visit[];

  @OneToMany(type => Like, like => like.user)
  likes: Like[];
}
