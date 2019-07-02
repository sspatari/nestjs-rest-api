import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksController } from './books.controller';
import { BooksService } from '../services/books.service';
import { BookEntity } from '../entities/book.entity';

describe('Books Controller', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: Repository,
        },
      ],
      controllers: [BooksController],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});
