import { Message } from './message';
import { FirestoreDataConverter } from 'firebase/firestore';

export class MessageFirestore {
  static collectionID = 'messages';
  static documentID = 'message_id';
  static virtualPath = `${MessageFirestore.collectionID}/{${MessageFirestore.documentID}}`;

  static converter: FirestoreDataConverter<Message> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Message(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${MessageFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${MessageFirestore.collectionPath()}/${id}`;
  }
}
