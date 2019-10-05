import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Sculpture } from './sculpture.entity';

@Entity()
export class SculptureImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ select: false, nullable: true })
  s3bucket: string;

  @Column({ select: false, nullable: true })
  s3key: string;

  @ManyToOne(type => Sculpture, sculpture => sculpture.images, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'sculptureId' })
  sculpture: Sculpture;
  @Column({ nullable: true }) //for many to one relation
  sculptureId: string;

  @CreateDateColumn()
  created: Date;
}
