import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class AskRequest extends proto.main.AskRequest {
  constructor(iAskRequest: proto.main.IAskRequest, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iAskRequest);
  }

  validate() {
    return false;
  }
}
