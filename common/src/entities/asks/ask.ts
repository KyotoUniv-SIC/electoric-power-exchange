import { proto } from '../..';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class AskRequest extends proto.main.AskRequest {
  created_at?: FieldValue | Timestamp;
  updated_at?: FieldValue | Timestamp;
  validate() {
    return false;
  }
}
