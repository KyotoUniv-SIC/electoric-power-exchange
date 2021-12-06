import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableSettlement extends proto.main.RenewableSettlement {
  constructor(iRenewableSettlement: proto.main.IRenewableSettlement, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableSettlement);
  }

  validate() {
    return false;
  }
}
