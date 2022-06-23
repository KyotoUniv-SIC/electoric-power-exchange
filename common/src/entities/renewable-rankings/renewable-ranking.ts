import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableRanking extends proto.main.RenewableRanking {
  constructor(iRenewableRanking: proto.main.IRenewableRanking, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableRanking);
  }

  validate() {
    return false;
  }
}
