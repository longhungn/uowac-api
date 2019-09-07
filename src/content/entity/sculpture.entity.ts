import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SculptureMaker } from './maker.entity';
import { Picture } from './picture.entity';

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

  @ManyToOne(type => SculptureMaker, maker => maker.sculptures)
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

  @OneToMany(type => Picture, picture => picture.sculpture)
  pictures: Picture[];
}
