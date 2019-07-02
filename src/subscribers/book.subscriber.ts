import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';
import { BookEntity } from '../entities/book.entity';

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<BookEntity> {
  listenTo() {
    return BookEntity;
  }

  beforeUpdate(event: UpdateEvent<BookEntity>) {
    event.entity.updatedAt = new Date();
  }
}
