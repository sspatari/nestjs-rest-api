import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from '../services/authors.service';
import { AuthorEntity } from '../entities/author.entity';

describe('Authors Controller', () => {
  let authorsController: AuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: Repository,
        },
      ],
      controllers: [AuthorsController],
    }).compile();

    authorsController = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });
});
