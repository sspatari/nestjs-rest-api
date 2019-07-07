import { Entity, Column, ObjectID } from 'typeorm';
import { GenericEntity } from '../../generics/generic.entity';

@Entity('book')
export class BookEntity extends GenericEntity {
  @Column('text') title: string;
  @Column('text') authorId: ObjectID;
  @Column('text') iban: string;
  @Column('datetime') publishedAt: Date;
}
