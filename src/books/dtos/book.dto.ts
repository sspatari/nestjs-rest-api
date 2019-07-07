import { ObjectID } from 'typeorm';

export class BookDto {
  readonly title: string;
  readonly authorId: ObjectID;
  readonly iban: string;
  readonly publishedAt: Date;
}
