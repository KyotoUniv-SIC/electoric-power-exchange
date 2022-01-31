import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class AdminPrivate extends proto.main.AdminPrivate {
  constructor(
    iAdminPrivate: proto.main.IAdminPrivate,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iAdminPrivate);
  }

  validate() {
    return false;
  }
}
