import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class Message extends proto.main.Message {
  constructor(iMessage: proto.main.IMessage, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iMessage);
  }

  validate() {
    return false;
  }
}
