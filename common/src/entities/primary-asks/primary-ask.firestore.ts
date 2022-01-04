import { PrimaryAsk } from './primary-ask';
import { FirestoreDataConverter } from 'firebase/firestore';

export class PrimaryAskFirestore {
  static collectionID = 'primary_asks';
  static documentID = 'primary_ask_id';
  static virtualPath = `${PrimaryAskFirestore.collectionID}/{${PrimaryAskFirestore.documentID}}`;

  static converter: FirestoreDataConverter<PrimaryAsk> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new PrimaryAsk(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${PrimaryAskFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${PrimaryAskFirestore.collectionPath()}/${id}`;
  }
}
