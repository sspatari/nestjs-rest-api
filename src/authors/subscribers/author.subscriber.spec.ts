import { expect } from 'chai';
import { AuthorSubscriber } from './author.subscriber';

describe('AuthorSubscriber', () => {
  it('should exist', () => {
    expect(new AuthorSubscriber()).to.exist;
  });
});
