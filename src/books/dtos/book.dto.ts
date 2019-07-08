import { ObjectID } from 'typeorm';
import {
  IsString,
  IsMongoId,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class BookDto {
  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsMongoId()
  readonly authorId: ObjectID;

  @IsString()
  @MaxLength(34)
  readonly iban: string;

  @IsDateString()
  readonly publishedAt: Date;
}
