import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalBidDelete extends proto.main.NormalBidDelete {
  constructor(iNormalBidDelete: proto.main.INormalBidDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalBidDelete);
  }

  validate() {
    return false;
  }
}
