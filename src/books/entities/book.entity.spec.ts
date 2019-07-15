import { expect } from 'chai';
import { BookEntity } from './book.entity';
import { GenericEntity } from '../../generics/generic.entity';

describe('BookEntity', () => {
  it('should exist', () => {
    expect(new BookEntity()).to.exist;
  });

  it('should be instace if GenericEntity', () => {
    expect(new BookEntity()).to.instanceOf(GenericEntity);
  });
});
