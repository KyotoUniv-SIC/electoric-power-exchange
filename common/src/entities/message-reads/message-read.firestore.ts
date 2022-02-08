import { FirestoreDataConverter } from 'firebase/firestore';
import { MessageRead } from './message-read';

export class MessageReadFirestore {
  static collectionID = 'message_reads';
  static documentID = 'message_read_id';
  static virtualPath = `${MessageReadFirestore.collectionID}/{${MessageReadFirestore.documentID}}`;

  static converter: FirestoreDataConverter<MessageRead> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MessageRead(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${MessageReadFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${MessageReadFirestore.collectionPath()}/${id}`;
  }
}
