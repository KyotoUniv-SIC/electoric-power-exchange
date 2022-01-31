import { proto } from '../../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class InsufficientBalance extends proto.main.InsufficientBalance {
  constructor(
    iInsufficientBalance: proto.main.IInsufficientBalance,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iInsufficientBalance);
  }

  validate() {
    return false;
  }
}
