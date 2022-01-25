import { proto } from '../..';
import { FieldValue, Timestamp } from 'firebase/firestore';

export class RoomChange extends proto.main.RoomChange {
  constructor(iRoomChange: proto.main.IRoomChange, public created_at?: FieldValue | Timestamp, public updated_at?: FieldValue | Timestamp) {
    super(iRoomChange);
  }

  validate() {
    return false;
  }
}
