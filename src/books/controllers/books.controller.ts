import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BooksService } from '../services/books.service';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

@Controller('books')
@ApiUseTags('books')
export class BooksController {
  private logger = new Logger('BooksController');

  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ title: 'Show all books' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrived all books',
  })
  findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Show specific book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrived book',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with such id not found',
  })
  findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ title: 'Create book' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The book has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() bookDto: CreateBookDto): Promise<BookEntity> {
    this.logger.log(JSON.stringify(bookDto));
    return this.booksService.create(bookDto);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The book with specified id has been successfully updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with such id not found',
  })
  update(
    @Param('id') id: string,
    @Body() bookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    this.logger.log(JSON.stringify(bookDto));
    return this.booksService.update(id, bookDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The book successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book with such id not found',
  })
  delete(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.delete(id);
  }
}
