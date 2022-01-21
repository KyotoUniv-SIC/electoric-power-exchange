import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableAskDelete extends proto.main.RenewableAskDelete {
  constructor(iRenewableAskDelete: proto.main.IRenewableAskDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableAskDelete);
  }

  validate() {
    return false;
  }
}
