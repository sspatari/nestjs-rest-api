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
import { BookDto } from '../models/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() bookDto: BookDto): Promise<BookEntity> {
    return this.bookService.create(bookDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookDto: Partial<BookDto>,
  ): Promise<BookEntity> {
    return this.bookService.update(id, bookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.bookService.delete(id);
  }
}
