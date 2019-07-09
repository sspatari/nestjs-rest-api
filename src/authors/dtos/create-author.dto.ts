import { IsString, IsDateString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateAuthorDto {
  @ApiModelProperty({ minLength: 2, type: String, example: 'Stanislav' })
  @IsString()
  @MinLength(2)
  readonly firstName: string;

  @ApiModelProperty({ minLength: 2, type: String, example: 'Spatari' })
  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2019-07-09 00:00:00.000Z',
  })
  @IsDateString()
  readonly birthday: Date;
}
