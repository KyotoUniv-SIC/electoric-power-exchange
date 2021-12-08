import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableBidHistory extends proto.main.RenewableBidHistory {
  constructor(iRenewableBidHistory: proto.main.IRenewableBidHistory, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableBidHistory);
  }

  validate() {
    return false;
  }
}
