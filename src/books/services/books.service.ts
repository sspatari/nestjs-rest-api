import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async create(data: CreateBookDto): Promise<BookEntity> {
    const book = await this.bookRepository.create(data);
    await this.bookRepository.save(book);
    return book;
  }

  async update(id: string, data: UpdateBookDto): Promise<BookEntity> {
    let book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    book = { ...book, ...data };
    return await this.bookRepository.save(book);
  }

  async delete(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.delete(id);
    return book;
  }
}
