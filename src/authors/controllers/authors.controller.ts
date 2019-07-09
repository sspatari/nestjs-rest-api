import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorsService } from '../services/authors.service';
import { AuthorEntity } from '../entities/author.entity';
import { CreateAuthorDto } from '../dtos/create-author.dto';
import { UpdateAuthorDto } from '../dtos/update-author.dto';

@Controller('authors')
@ApiUseTags('authors')
export class AuthorsController {
  private logger = new Logger('AuthorsController');

  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ title: 'Show all authors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrived all authors',
  })
  findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Show specific author' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrived author',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Author with such id not found',
  })
  findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiOperation({ title: 'Create author' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The author has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() authorDto: CreateAuthorDto): Promise<AuthorEntity> {
    this.logger.log(JSON.stringify(authorDto));
    return this.authorsService.create(authorDto);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update author' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The author with specified id has been successfully updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Author with such id not found',
  })
  update(
    @Param('id') id: string,
    @Body() authorDto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    this.logger.log(JSON.stringify(authorDto));
    return this.authorsService.update(id, authorDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The author successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Author with such id not found',
  })
  @ApiOperation({ title: 'Delete author' })
  delete(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.delete(id);
  }
}
