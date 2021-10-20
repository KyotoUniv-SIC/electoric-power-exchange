import { proto } from '../..';

export class Ask extends proto.main.AskRequest {
  created_at: import('@angular/fire/firestore').FieldValue | undefined;
  updated_at: import('@angular/fire/firestore').FieldValue | undefined;
  validate() {
    return false;
  }
}
