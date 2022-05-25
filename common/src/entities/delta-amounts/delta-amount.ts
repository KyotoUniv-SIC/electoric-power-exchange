import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class DeltaAmount extends proto.main.DeltaAmount {
  constructor(iDeltaAmount: proto.main.IDeltaAmount, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iDeltaAmount);
  }

  validate() {
    return false;
  }
}
