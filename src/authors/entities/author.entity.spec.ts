import { expect } from 'chai';
import { AuthorEntity } from './author.entity';
import { GenericEntity } from '../../generics/generic.entity';

describe('AuthorEntity', () => {
  it('should exist', () => {
    expect(new AuthorEntity()).to.exist;
  });

  it('should be instace if GenericEntity', () => {
    expect(new AuthorEntity()).to.instanceOf(GenericEntity);
  });
});
