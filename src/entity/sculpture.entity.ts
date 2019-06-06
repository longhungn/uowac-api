import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SculptureMaker } from './maker.entity';

@Entity()
export class Sculpture {
  @PrimaryColumn()
  accessionId: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 }) //DECIMAL(10,7)
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 }) //DECIMAL(10,7)
  latitude: number;

  @ManyToOne(type => SculptureMaker, maker => maker.sculptures)
  @JoinColumn({ name: 'primaryMakerId' })
  primaryMaker: SculptureMaker;
  @Column()
  primaryMakerId: string;

  @Column()
  productionDate: string;

  @Column()
  material: string;

  @Column()
  creditLine: string;

  @Column()
  currentLocation: string;

  @Column({ nullable: true })
  locationNotes: string;

  @Column({ nullable: true })
  description: string; //optional introduction about sculpture
}
