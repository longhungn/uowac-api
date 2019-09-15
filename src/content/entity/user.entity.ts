import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../../social/entity/comment.entity';

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

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
}
