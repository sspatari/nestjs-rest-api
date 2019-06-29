import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('book')
export class BookEntity {
  @ObjectIdColumn() id: string;
  @Column('text') title: string;
  @Column('text') author: string;
  @Column('text') iban: string;
  @Column('datetime') publishedAt: Date;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
