import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class MessageDelete extends proto.main.MessageDelete {
  constructor(iMessageDelete: proto.main.IMessageDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iMessageDelete);
  }

  validate() {
    return false;
  }
}
