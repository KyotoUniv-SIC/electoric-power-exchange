import { proto } from '../..';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class BidRequest extends proto.main.BidRequest {
  created_at?: FieldValue | Timestamp;
  updated_at?: FieldValue | Timestamp;

  validate() {
    return false;
  }
}
