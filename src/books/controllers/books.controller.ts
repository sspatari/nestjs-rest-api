import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Logger,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/book.dto';

@Controller('books')
export class BooksController {
  private logger = new Logger('BooksController');

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
    this.logger.log(JSON.stringify(bookDto));
    return this.booksService.create(bookDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() bookDto: Partial<BookDto>,
  ): Promise<BookEntity> {
    this.logger.log(JSON.stringify(bookDto));
    return this.booksService.update(id, bookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.delete(id);
  }
}
