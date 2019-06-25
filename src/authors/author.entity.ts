import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('author')
export class AuthorEntity {
  @ObjectIdColumn() id: string;
  @Column('text') firstName: string;
  @Column('text') lastName: string;
  @Column('datetime') birthday: Date;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
