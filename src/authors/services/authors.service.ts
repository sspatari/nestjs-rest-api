import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorDto } from 'src/authors/dtos/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async findAll(): Promise<AuthorEntity[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne(id);
    if (!author) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  async create(data: AuthorDto): Promise<AuthorEntity> {
    const author = await this.authorRepository.create(data);
    await this.authorRepository.save(author);
    return author;
  }

  async update(id: string, data: Partial<AuthorDto>): Promise<AuthorEntity> {
    let author = await this.authorRepository.findOne(id);
    if (!author) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    author = { ...author, ...data };
    return await this.authorRepository.save(author);
  }

  async delete(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne(id);
    if (!author) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.authorRepository.delete(id);
    return author;
  }
}
