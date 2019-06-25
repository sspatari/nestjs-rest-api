import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { AuthorDto } from 'src/models/author.dto';

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
    return await this.authorRepository.findOne(id);
  }

  async create(data: AuthorDto): Promise<AuthorEntity> {
    const author = await this.authorRepository.create(data);
    await this.authorRepository.save(author);
    return author;
  }

  async update(id: string, data: Partial<AuthorDto>): Promise<AuthorEntity> {
    await this.authorRepository.update(id, data);
    return await this.authorRepository.findOne(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.authorRepository.delete(id);
  }
}
