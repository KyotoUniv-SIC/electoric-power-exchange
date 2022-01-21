import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalAskDelete } from './normal-ask-delete';

export class NormalAskDeleteFirestore {
  static collectionID = 'normal_ask_deletes';
  static documentID = 'normal_ask_delete_id';
  static virtualPath = `${NormalAskDeleteFirestore.collectionID}/{${NormalAskDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<NormalAskDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalAskDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalAskDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalAskDeleteFirestore.collectionPath()}/${id}`;
  }
}
