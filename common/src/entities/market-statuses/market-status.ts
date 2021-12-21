import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class MarketStatus extends proto.main.MarketStatus {
  constructor(iMarketStatus: proto.main.IMarketStatus, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iMarketStatus);
  }

  validate() {
    return false;
  }
}
