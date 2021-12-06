import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalSettlement extends proto.main.NormalSettlement {
  constructor(iNormalSettlement: proto.main.INormalSettlement, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalSettlement);
  }

  validate() {
    return false;
  }
}
