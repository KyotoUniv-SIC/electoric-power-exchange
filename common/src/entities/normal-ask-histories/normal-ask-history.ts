import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalAskHistory extends proto.main.NormalAskHistory {
  constructor(iNormalAskHistory: proto.main.INormalAskHistory, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalAskHistory);
  }

  validate() {
    return false;
  }
}
