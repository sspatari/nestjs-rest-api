import { ObjectID } from 'typeorm';
import {
  IsString,
  IsMongoId,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiModelProperty({ minLength: 2, type: String, example: 'Harry Potter' })
  @IsString()
  @MinLength(2)
  readonly title: string;

  @ApiModelProperty()
  @IsMongoId()
  readonly authorId: ObjectID;

  @ApiModelProperty({
    maxLength: 34,
    type: String,
    example: 'DE89 3704 0044 0532 0130 00',
  })
  @IsString()
  @MaxLength(34)
  readonly iban: string;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2019-07-09 00:00:00.000Z',
  })
  @IsDateString()
  readonly publishedAt: Date;
}
