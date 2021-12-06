import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class SinglePriceNormalSettlement extends proto.main.SinglePriceNormalSettlement {
  constructor(
    iSinglePriceNormalSettlement: proto.main.ISinglePriceNormalSettlement,
    public market_date?: FieldValue | Timestamp,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iSinglePriceNormalSettlement);
  }

  validate() {
    return false;
  }
}
