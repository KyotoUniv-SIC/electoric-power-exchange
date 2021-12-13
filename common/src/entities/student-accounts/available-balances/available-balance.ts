import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class AvailableBalance extends proto.main.AvailableBalance {
  constructor(
    iAvailableBalance: proto.main.IAvailableBalance,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iAvailableBalance);
  }

  validate() {
    return false;
  }
}
