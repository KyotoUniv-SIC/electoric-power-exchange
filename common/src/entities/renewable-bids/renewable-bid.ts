import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableBid extends proto.main.RenewableBid {
  constructor(iRenewableBid: proto.main.IRenewableBid, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableBid);
  }

  validate() {
    return false;
  }
}
