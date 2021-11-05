import { proto } from '../..';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class BidRequest extends proto.main.BidRequest {
  constructor(iBidRequest: proto.main.IBidRequest, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iBidRequest);
  }

  validate() {
    return false;
  }
}
