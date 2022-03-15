import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class DailyPayment extends proto.main.DailyPayment {
  constructor(iDailyPayment: proto.main.IDailyPayment, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iDailyPayment);
  }

  validate() {
    return false;
  }
}
