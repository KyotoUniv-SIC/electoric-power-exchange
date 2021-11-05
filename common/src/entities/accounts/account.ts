import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class Account extends proto.main.Account {
  constructor(iAccount: proto.main.IAccount, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iAccount);
  }

  validate() {
    return false;
  }
}
