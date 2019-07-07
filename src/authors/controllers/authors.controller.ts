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
import { AuthorsService } from '../services/authors.service';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorDto } from '../dtos/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.findOne(id);
  }

  @Post()
  create(@Body() authorDto: AuthorDto): Promise<AuthorEntity> {
    return this.authorsService.create(authorDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() authorDto: Partial<AuthorDto>,
  ): Promise<AuthorEntity> {
    return this.authorsService.update(id, authorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.delete(id);
  }
}
