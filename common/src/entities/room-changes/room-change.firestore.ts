import { FirestoreDataConverter } from 'firebase/firestore';
import { RoomChange } from './room-change';

export class RoomChangeFirestore {
  static collectionID = 'room_changes';
  static documentID = 'room_change_id';
  static virtualPath = `${RoomChangeFirestore.collectionID}/{${RoomChangeFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RoomChange> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RoomChange(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RoomChangeFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RoomChangeFirestore.collectionPath()}/${id}`;
  }
}
