import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class ChatDelete extends proto.main.ChatDelete {
  constructor(iChatDelete: proto.main.IChatDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iChatDelete);
  }

  validate() {
    return false;
  }
}
