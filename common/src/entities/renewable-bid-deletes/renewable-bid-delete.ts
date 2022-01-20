import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableBidDelete extends proto.main.RenewableBidDelete {
  constructor(iRenewableBidDelete: proto.main.IRenewableBidDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableBidDelete);
  }

  validate() {
    return false;
  }
}
