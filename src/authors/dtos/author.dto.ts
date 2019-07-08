import {
  IsString,
  IsDate,
  IsISO8601,
  IsDateString,
  MinLength,
} from 'class-validator';
export class AuthorDto {
  @IsString()
  @MinLength(2)
  readonly firstName: string;

  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @IsDateString()
  readonly birthday: Date;
}
