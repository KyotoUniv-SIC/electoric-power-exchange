import { proto } from '../..';

export class BidRequest extends proto.main.BidRequest {
  created_at: import('@angular/fire/firestore').FieldValue | undefined;
  updated_at: import('@angular/fire/firestore').FieldValue | undefined;
  validate() {
    return false;
  }
}
