import { AskRequest } from './ask';
import { FirestoreDataConverter } from 'firebase/firestore';

export class AskFirestore {
  static collectionID = 'asks';
  static documentID = 'ask_id';
  static virtualPath = `${AskFirestore.collectionID}/${AskFirestore.documentID}`;

  static converter: FirestoreDataConverter<AskRequest> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AskRequest(data);
    },
  };

  static collectionPath() {
    return `${AskFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${AskFirestore.collectionPath()}/${id}`;
  }
}
