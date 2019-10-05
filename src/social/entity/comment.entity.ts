import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  // many-to-one relationship with User
  @ManyToOne(type => User, user => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  // join column with User
  @Column()
  userId: string;

  // many-to-one relationship with Sculpture
  @ManyToOne(type => Sculpture, sculpture => sculpture.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sculptureId' })
  sculpture: Sculpture;

  // join column with Sculpture
  @Column()
  sculptureId: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedTime: Date;

  @Column()
  content: string;
}
