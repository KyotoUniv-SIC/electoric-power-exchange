import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class User extends proto.main.User {
  constructor(iUser: proto.main.IUser, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iUser);
  }

  validate() {
    return false;
  }
}
