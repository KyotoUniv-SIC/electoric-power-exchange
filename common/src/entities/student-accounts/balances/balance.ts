import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class Balance extends proto.main.Balance {
  constructor(iBalance: proto.main.IBalance, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iBalance);
  }

  validate() {
    return false;
  }
}
