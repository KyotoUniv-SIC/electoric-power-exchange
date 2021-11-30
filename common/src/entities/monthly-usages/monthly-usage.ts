import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class MonthlyUsage extends proto.main.MonthlyUsage {
  constructor(iMonthlyUsage: proto.main.IMonthlyUsage, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iMonthlyUsage);
  }

  validate() {
    return false;
  }
}
