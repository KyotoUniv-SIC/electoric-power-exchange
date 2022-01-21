import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalAskDelete extends proto.main.NormalAskDelete {
  constructor(iNormalAskDelete: proto.main.INormalAskDelete, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalAskDelete);
  }

  validate() {
    return false;
  }
}
