import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class NormalAskSetting extends proto.main.NormalAskSetting {
  constructor(iNormalAskSetting: proto.main.INormalAskSetting, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iNormalAskSetting);
  }

  validate() {
    return false;
  }
}
