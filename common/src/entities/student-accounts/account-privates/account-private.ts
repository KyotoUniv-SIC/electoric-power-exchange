import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class AccountPrivate extends proto.main.AccountPrivate {
  constructor(
    iAccountPrivate: proto.main.IAccountPrivate,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iAccountPrivate);
  }

  validate() {
    return false;
  }
}
