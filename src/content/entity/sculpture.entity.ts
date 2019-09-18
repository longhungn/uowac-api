import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SculptureMaker } from './maker.entity';
import { SculptureImage } from './image.entity';
import { Comment } from '../../social/entity/comment.entity';
import { Visit } from '../../social/entity/visit.entity';

@Entity()
export class Sculpture {
  @PrimaryColumn()
  accessionId: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true }) //DECIMAL(10,7)
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true }) //DECIMAL(10,7)
  latitude: number;

  @ManyToOne(type => SculptureMaker, maker => maker.sculptures, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'primaryMakerId' })
  primaryMaker: SculptureMaker;
  @Column({ nullable: true })
  primaryMakerId: string;

  @Column({ nullable: true })
  productionDate: string;

  @Column({ nullable: true })
  material: string;

  @Column({ nullable: true })
  creditLine: string;

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ nullable: true })
  locationNotes: string;

  @Column({ nullable: true })
  description: string; //optional introduction about sculpture

  @OneToMany(type => SculptureImage, picture => picture.sculpture)
  images: SculptureImage[];

  @OneToMany(type => Comment, comment => comment.sculpture)
  comments: Comment[];

  @OneToMany(type => Visit, visit => visit.sculpture)
  visits: Visit[];
}
