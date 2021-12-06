import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class AdminAccount extends proto.main.AdminAccount {
  constructor(iAdminAccount: proto.main.IAdminAccount, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iAdminAccount);
  }

  validate() {
    return false;
  }
}
