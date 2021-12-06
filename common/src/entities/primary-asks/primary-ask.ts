import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class PrimaryAsk extends proto.main.PrimaryAsk {
  constructor(iPrimaryAsk: proto.main.IPrimaryAsk, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iPrimaryAsk);
  }

  validate() {
    return false;
  }
}
