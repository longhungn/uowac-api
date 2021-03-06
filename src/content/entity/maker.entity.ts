import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Sculpture } from './sculpture.entity';

/**
 * Object relational mapping for SculptureMaker
 * Corresponds to 'sculpture_maker' table in database
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
@Entity()
export class SculptureMaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  code: string; //human-readable code

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'smallint', nullable: true })
  birthYear: number;

  @Column({ type: 'smallint', nullable: true })
  deathYear: number;

  @Column({ nullable: true })
  info: string; //short description

  @Column({ nullable: true })
  wikiUrl: string;

  @OneToMany(type => Sculpture, scuplture => scuplture.primaryMaker)
  sculptures: Sculpture[];

  @Column({ nullable: true })
  nationality: string;

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
