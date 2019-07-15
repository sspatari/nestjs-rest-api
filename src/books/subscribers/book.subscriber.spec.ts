import { expect } from 'chai';
import { BookSubscriber } from './book.subscriber';

describe('BookSubscriber', () => {
  it('should exist', () => {
    expect(new BookSubscriber()).to.exist;
  });
});
