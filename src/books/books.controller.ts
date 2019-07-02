import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BooksService } from './books.service';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() bookDto: BookDto): Promise<BookEntity> {
    return this.booksService.create(bookDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookDto: Partial<BookDto>,
  ): Promise<BookEntity> {
    return this.booksService.update(id, bookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.booksService.delete(id);
  }
}
