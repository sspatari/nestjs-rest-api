import { ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {
  @ObjectIdColumn() id: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
