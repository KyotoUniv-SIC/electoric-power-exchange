import { FirestoreDataConverter } from 'firebase/firestore';
import { MessageDelete } from './message-delete';

export class MessageDeleteFirestore {
  static collectionID = 'message_deletes';
  static documentID = 'message_delete_id';
  static virtualPath = `${MessageDeleteFirestore.collectionID}/{${MessageDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<MessageDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MessageDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${MessageDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${MessageDeleteFirestore.collectionPath()}/${id}`;
  }
}
