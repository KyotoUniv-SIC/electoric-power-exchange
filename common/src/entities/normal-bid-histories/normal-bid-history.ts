import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalBidHistory extends proto.main.NormalBidHistory {
  constructor(
    iNormalBidHistory: proto.main.INormalBidHistory,
    public bid_created_at?: FieldValue | Timestamp,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iNormalBidHistory);
  }

  validate() {
    return false;
  }
}
