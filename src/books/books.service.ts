import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/book.dto';

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
    return await this.bookRepository.findOne(id);
  }

  async create(data: BookDto): Promise<BookEntity> {
    const book = await this.bookRepository.create(data);
    await this.bookRepository.save(book);
    return book;
  }

  async update(id: string, data: Partial<BookDto>): Promise<BookEntity> {
    await this.bookRepository.update(id, data);
    return await this.bookRepository.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.bookRepository.delete(id);
  }
}
