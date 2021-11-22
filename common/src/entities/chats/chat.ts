import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class Chat extends proto.main.Chat {
  constructor(iChat: proto.main.IChat, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iChat);
  }

  validate() {
    return false;
  }
}
