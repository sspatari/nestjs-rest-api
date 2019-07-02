import { Entity, Column } from 'typeorm';
import { GenericEntity } from './generic.entity';

@Entity('author')
export class AuthorEntity extends GenericEntity {
  @Column('text') firstName: string;
  @Column('text') lastName: string;
  @Column('datetime') birthday: Date;
}
