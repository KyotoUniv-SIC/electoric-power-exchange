import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalAsk extends proto.main.NormalAsk {
  constructor(iNormalAsk: proto.main.INormalAsk, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalAsk);
  }

  validate() {
    return false;
  }
}
