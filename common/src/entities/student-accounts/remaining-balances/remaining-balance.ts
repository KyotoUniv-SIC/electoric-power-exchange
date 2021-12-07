import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RemainingBalance extends proto.main.RemainingBalance {
  constructor(
    iRemainingBalance: proto.main.IRemainingBalance,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iRemainingBalance);
  }

  validate() {
    return false;
  }
}
