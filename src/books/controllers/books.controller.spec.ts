import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { BooksController } from './books.controller';
import { BooksService } from '../services/books.service';
import { BookEntity } from '../entities/book.entity';

import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

describe('Books Controller', () => {
  let sandbox: sinon.SinonSandbox;
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: [sinon.createStubInstance(Repository)],
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksController = module.get<BooksController>(BooksController);
  });

  describe('findAll', () => {
    let findAllStub: sinon.SinonStub;
    let result: BookEntity[];

    beforeEach(() => {
      result = [new BookEntity()];
      findAllStub = sandbox
        .stub(booksService, 'findAll')
        .callsFake(async () => result);
    });

    it('should exist', () => {
      expect(booksController).to.exist;
    });

    it('should call booksService findAll', async () => {
      await booksController.findAll();
      expect(findAllStub.calledOnce).to.be.true;
    });

    it('should return an array of BookEntities', async () => {
      expect(await booksController.findAll()).to.equal(result);
    });
  });

  describe('findOne', () => {
    it('should call booksService findOne method with id 1234', async () => {
      const id: string = '1234';
      const findOneStub = sandbox.stub(booksService, 'findOne');
      await booksController.findOne(id);
      expect(findOneStub.calledOnceWith(id)).to.be.true;
    });
  });

  describe('create', () => {
    it('should call booksService create method with createBookDto', async () => {
      const createBookDto: CreateBookDto = {
        title: 'BestBook1',
        authorId: '5d23ed110cbdcfc20044ec56',
        iban: '24124214',
        publishedAt: new Date('2000-06-06T00:00:00.000Z'),
      };
      const createStub = sandbox.stub(booksService, 'create');
      await booksController.create(createBookDto);
      expect(createStub.calledOnceWith(createBookDto)).to.be.true;
    });
  });

  describe('update', () => {
    it('should call booksService update method with id 1234 and updateBookDto as param', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'BestBook1',
        authorId: '5d23ed110cbdcfc20044ec56',
        iban: '24124214',
        publishedAt: new Date('2000-06-06T00:00:00.000Z'),
      };
      const id: string = '1234';
      const updateStub = sandbox.stub(booksService, 'update');
      await booksController.update(id, updateBookDto);
      expect(updateStub.calledOnceWith(id, updateBookDto)).to.be.true;
    });
  });

  describe('delete', () => {
    it('should call booksService delete method with id 1234', async () => {
      const id: string = '1234';
      const deleteStub = sandbox.stub(booksService, 'delete');
      await booksController.delete(id);
      expect(deleteStub.calledOnceWith(id)).to.be.true;
    });
  });
});
