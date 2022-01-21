import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableAskDelete } from './renewable-ask-delete';

export class RenewableAskDeleteFirestore {
  static collectionID = 'renewable_ask_deletes';
  static documentID = 'renewable_ask_delete_id';
  static virtualPath = `${RenewableAskDeleteFirestore.collectionID}/{${RenewableAskDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableAskDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableAskDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableAskDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableAskDeleteFirestore.collectionPath()}/${id}`;
  }
}
