import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableAsk extends proto.main.RenewableAsk {
  constructor(iRenewableAsk: proto.main.IRenewableAsk, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableAsk);
  }

  validate() {
    return false;
  }
}
