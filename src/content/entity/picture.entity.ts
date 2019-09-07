import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sculpture } from './sculpture.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(type => Sculpture, sculpture => sculpture.pictures, {onDelete: 'CASCADE', nullable: true})
  @JoinColumn({ name: 'sculptureId' })
  sculpture: Sculpture;
  @Column({nullable: true}) //for many to one relation
  sculptureId: string;
}
