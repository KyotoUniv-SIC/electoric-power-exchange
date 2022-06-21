import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RenewableRewardSetting extends proto.main.RenewableRewardSetting {
  constructor(iRenewableRewardSetting: proto.main.IRenewableRewardSetting, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRenewableRewardSetting);
  }

  validate() {
    return false;
  }
}
