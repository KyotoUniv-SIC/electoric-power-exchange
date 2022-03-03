import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableAskHistory extends proto.main.RenewableAskHistory {
  constructor(
    iRenewableAskHistory: proto.main.IRenewableAskHistory,
    public ask_created_at?: FieldValue | Timestamp,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iRenewableAskHistory);
  }

  validate() {
    return false;
  }
}
