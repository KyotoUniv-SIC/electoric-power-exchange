import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalBid extends proto.main.NormalBid {
  constructor(iNormalBid: proto.main.INormalBid, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalBid);
  }

  validate() {
    return false;
  }
}
