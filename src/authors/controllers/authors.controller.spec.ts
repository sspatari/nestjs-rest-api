import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from '../services/authors.service';
import { AuthorEntity } from '../entities/author.entity';

import { CreateAuthorDto } from '../dtos/create-author.dto';
import { UpdateAuthorDto } from '../dtos/update-author.dto';

describe('Authors Controller', () => {
  let sandbox: sinon.SinonSandbox;
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: [sinon.createStubInstance(Repository)],
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    authorsController = module.get<AuthorsController>(AuthorsController);
  });

  describe('findAll', () => {
    let findAllStub: sinon.SinonStub;
    let result: AuthorEntity[];

    beforeEach(() => {
      result = [new AuthorEntity()];
      findAllStub = sandbox
        .stub(authorsService, 'findAll')
        .callsFake(async () => result);
    });

    it('should exist', () => {
      expect(authorsController).to.exist;
    });

    it('should call authorsService findAll', async () => {
      await authorsController.findAll();
      expect(findAllStub.calledOnce).to.be.true;
    });

    it('should return an array of AuthorEntities', async () => {
      expect(await authorsController.findAll()).to.equal(result);
    });
  });

  describe('findOne', () => {
    it('should call authorsService findOne method with id 1234', async () => {
      const id: string = '1234';
      const findOneStub = sandbox.stub(authorsService, 'findOne');
      await authorsController.findOne(id);
      expect(findOneStub.calledOnceWith(id)).to.be.true;
    });
  });

  describe('create', () => {
    it('should call authorsService create method with createAuthorDto', async () => {
      const createAuthorDto: CreateAuthorDto = {
        firstName: 'Stanislav',
        lastName: 'Spatari',
        birthday: new Date('2000-06-06T00:00:00.000Z'),
      };
      const createStub = sandbox.stub(authorsService, 'create');
      await authorsController.create(createAuthorDto);
      expect(createStub.calledOnceWith(createAuthorDto)).to.be.true;
    });
  });

  describe('update', () => {
    it('should call authorsService update method with id 1234 and updateAuthorDto as param', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        firstName: 'Stanislav',
        lastName: 'Spatari',
        birthday: new Date('2000-06-06T00:00:00.000Z'),
      };
      const id: string = '1234';
      const updateStub = sandbox.stub(authorsService, 'update');
      await authorsController.update(id, updateAuthorDto);
      expect(updateStub.calledOnceWith(id, updateAuthorDto)).to.be.true;
    });
  });

  describe('delete', () => {
    it('should call authorsService delete method with id 1234', async () => {
      const id: string = '1234';
      const deleteStub = sandbox.stub(authorsService, 'delete');
      await authorsController.delete(id);
      expect(deleteStub.calledOnceWith(id)).to.be.true;
    });
  });
});
