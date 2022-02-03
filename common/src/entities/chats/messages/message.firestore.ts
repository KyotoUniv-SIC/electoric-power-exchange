import { FirestoreDataConverter } from 'firebase/firestore';
import { Message } from './message';
import { ChatFirestore } from '..';

export class MessageFirestore {
  static collectionID = 'messages';
  static documentID = 'message_id';
  static virtualPath = `${ChatFirestore.virtualPath}/${MessageFirestore.collectionID}/{${MessageFirestore.documentID}}`;

  static converter: FirestoreDataConverter<Message> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Message(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath(chatID: string) {
    return `${ChatFirestore.documentPath(chatID)}/${MessageFirestore.collectionID}`;
  }

  static documentPath(chatID: string, id: string) {
    return `${MessageFirestore.collectionPath(chatID)}/${id}`;
  }
}
