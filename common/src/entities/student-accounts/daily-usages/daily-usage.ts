import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class DailyUsage extends proto.main.DailyUsage {
  constructor(iDailyUsage: proto.main.IDailyUsage, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iDailyUsage);
  }

  validate() {
    return false;
  }
}
