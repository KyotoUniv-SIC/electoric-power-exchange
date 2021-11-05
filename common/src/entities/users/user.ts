import { proto } from '../..';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class User extends proto.main.User {
  created_at?: FieldValue | Timestamp;
  updated_at?: FieldValue | Timestamp;

  validate() {
    return false;
  }
}
