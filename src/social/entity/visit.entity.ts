import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../content/entity/user.entity';
import { Sculpture } from '../../content/entity/sculpture.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  visitId: string;

  @ManyToOne(type => User, user => user.visits, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(type => Sculpture, sculpture => sculpture.visits, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sculptureId' })
  sculpture: Sculpture;

  @Column()
  sculptureId: string;

  @CreateDateColumn()
  visitTime: string;
}
