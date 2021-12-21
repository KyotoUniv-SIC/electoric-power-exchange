import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class MonthlyPayment extends proto.main.MonthlyPayment {
  constructor(
    iMonthlyPayment: proto.main.IMonthlyPayment,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iMonthlyPayment);
  }

  validate() {
    return false;
  }
}
