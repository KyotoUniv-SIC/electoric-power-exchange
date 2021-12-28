import { NormalAsk } from './normal-ask';
import { FirestoreDataConverter } from 'firebase/firestore';

export class NormalAskFirestore {
  static collectionID = 'normal_asks';
  static documentID = 'normal_ask_id';
  static virtualPath = `${NormalAskFirestore.collectionID}/{${NormalAskFirestore.documentID}}`;

  static converter: FirestoreDataConverter<NormalAsk> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalAsk(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${NormalAskFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalAskFirestore.collectionPath()}/${id}`;
  }
}
