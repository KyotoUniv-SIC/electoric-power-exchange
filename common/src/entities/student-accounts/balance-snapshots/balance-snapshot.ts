import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class BalanceSnapshot extends proto.main.BalanceSnapshot {
  constructor(
    iBalanceSnapshot: proto.main.IBalanceSnapshot,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iBalanceSnapshot);
  }

  validate() {
    return false;
  }
}
