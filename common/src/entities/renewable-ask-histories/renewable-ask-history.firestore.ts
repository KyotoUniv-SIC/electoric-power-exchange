import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableAskHistory } from './renewable-ask-history';

export class RenewableAskHistoryFirestore {
  static collectionID = 'renewable_ask_histories';
  static documentID = 'renewable_ask_history_id';
  static virtualPath = `${RenewableAskHistoryFirestore.collectionID}/${RenewableAskHistoryFirestore.documentID}`;

  static converter: FirestoreDataConverter<RenewableAskHistory> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableAskHistory(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableAskHistoryFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableAskHistoryFirestore.collectionPath()}/${id}`;
  }
}
