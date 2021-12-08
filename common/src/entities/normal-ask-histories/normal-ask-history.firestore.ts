import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalAskHistory } from './normal-ask-history';

export class NormalAskHistoryFirestore {
  static collectionID = 'normal_ask_histories';
  static documentID = 'normal_ask_history_id';
  static virtualPath = `${NormalAskHistoryFirestore.collectionID}/${NormalAskHistoryFirestore.documentID}`;

  static converter: FirestoreDataConverter<NormalAskHistory> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalAskHistory(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalAskHistoryFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalAskHistoryFirestore.collectionPath()}/${id}`;
  }
}
