import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class CostSetting extends proto.main.CostSetting {
  constructor(iCostSetting: proto.main.ICostSetting, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iCostSetting);
  }

  validate() {
    return false;
  }
}
