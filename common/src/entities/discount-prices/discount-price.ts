import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class DiscountPrice extends proto.main.DiscountPrice {
  constructor(iDiscountPrice: proto.main.IDiscountPrice, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iDiscountPrice);
  }

  validate() {
    return false;
  }
}
