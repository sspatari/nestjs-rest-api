import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { BookEntity } from '../entities/book.entity';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: Repository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});
