import { IsString, IsDateString, MinLength, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateAuthorDto {
  @ApiModelProperty({
    minLength: 2,
    type: String,
    example: 'Stanislav',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly firstName: string;

  @ApiModelProperty({
    minLength: 2,
    type: String,
    example: 'Spatari',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2019-07-09 00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  readonly birthday: Date;
}
