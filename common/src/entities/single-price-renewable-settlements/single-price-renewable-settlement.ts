import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class SinglePriceRenewableSettlement extends proto.main.SinglePriceRenewableSettlement {
  constructor(
    iSinglePriceRenewableSettlement: proto.main.ISinglePriceRenewableSettlement,
    public market_date?: FieldValue | Timestamp,
    public created_at?: FieldValue | Timestamp,
    public updated_at?: FieldValue | Timestamp,
  ) {
    super(iSinglePriceRenewableSettlement);
  }

  validate() {
    return false;
  }
}
