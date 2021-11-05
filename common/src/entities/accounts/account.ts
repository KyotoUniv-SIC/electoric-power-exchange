import { proto } from '../..';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class Account extends proto.main.Account {
  created_at?: FieldValue | Timestamp;
  updated_at?: FieldValue | Timestamp;

  validate() {
    return false;
  }
}
