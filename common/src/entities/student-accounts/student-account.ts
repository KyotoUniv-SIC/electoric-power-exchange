import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class StudentAccount extends proto.main.StudentAccount {
  constructor(iStudentAccount: proto.main.IStudentAccount, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iStudentAccount);
  }

  validate() {
    return false;
  }
}
