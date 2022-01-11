import { Chat } from './chat';
import { FirestoreDataConverter } from 'firebase/firestore';

export class ChatFirestore {
  static collectionID = 'chats';
  static documentID = 'chat_id';
  static virtualPath = `${ChatFirestore.collectionID}/{${ChatFirestore.documentID}}`;

  static converter: FirestoreDataConverter<Chat> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Chat(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${ChatFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${ChatFirestore.collectionPath()}/${id}`;
  }
}
