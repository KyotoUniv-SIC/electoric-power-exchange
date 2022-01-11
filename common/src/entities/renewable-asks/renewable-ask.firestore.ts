import { RenewableAsk } from './renewable-ask';
import { FirestoreDataConverter } from 'firebase/firestore';

export class RenewableAskFirestore {
  static collectionID = 'renewable_asks';
  static documentID = 'renewable_ask_id';
  static virtualPath = `${RenewableAskFirestore.collectionID}/{${RenewableAskFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableAsk> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableAsk(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${RenewableAskFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableAskFirestore.collectionPath()}/${id}`;
  }
}
