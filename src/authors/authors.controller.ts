import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AuthorsService } from './authors.service';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorDto } from '../dtos/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  findAll(): Promise<AuthorEntity[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorService.findOne(id);
  }

  @Post()
  create(@Body() authorDto: AuthorDto): Promise<AuthorEntity> {
    return this.authorService.create(authorDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() authorDto: Partial<AuthorDto>,
  ): Promise<AuthorEntity> {
    return this.authorService.update(id, authorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.authorService.delete(id);
  }
}
