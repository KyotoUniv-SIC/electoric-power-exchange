import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableAskSetting extends proto.main.RenewableAskSetting {
  constructor(iRenewableAskSetting: proto.main.IRenewableAskSetting, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableAskSetting);
  }

  validate() {
    return false;
  }
}
