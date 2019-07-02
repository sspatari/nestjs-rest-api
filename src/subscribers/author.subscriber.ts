import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';

@EventSubscriber()
export class AuthorSubscriber
  implements EntitySubscriberInterface<AuthorEntity> {
  listenTo() {
    return AuthorEntity;
  }

  beforeUpdate(event: UpdateEvent<AuthorEntity>) {
    event.entity.updatedAt = new Date();
  }
}
