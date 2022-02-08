import { FirestoreDataConverter } from 'firebase/firestore';
import { ChatDelete } from './chat-delete';

export class ChatDeleteFirestore {
  static collectionID = 'chat_deletes';
  static documentID = 'chat_delete_id';
  static virtualPath = `${ChatDeleteFirestore.collectionID}/{${ChatDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<ChatDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new ChatDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${ChatDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${ChatDeleteFirestore.collectionPath()}/${id}`;
  }
}
