import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class PrimaryBid extends proto.main.PrimaryBid {
  constructor(iPrimaryBid: proto.main.IPrimaryBid, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iPrimaryBid);
  }

  validate() {
    return false;
  }
}
