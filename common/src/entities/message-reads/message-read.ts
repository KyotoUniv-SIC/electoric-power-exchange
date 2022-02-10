import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class MessageRead extends proto.main.MessageRead {
  constructor(iMessageRead: proto.main.IMessageRead, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iMessageRead);
  }

  validate() {
    return false;
  }
}
