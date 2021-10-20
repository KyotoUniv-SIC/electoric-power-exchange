import { FirestoreDataConverter } from 'firebase/firestore';
import { Ask } from './ask';

export class AskFirestore {
  static collectionID = 'asks';
  static documentID = 'ask_id';
  static virtualPath = `${AskFirestore.collectionID}/${AskFirestore.documentID}`;

  static converter: FirestoreDataConverter<Ask> = {
    toFirestore: (data) => ({...data}),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Ask(data);
    }
  };

  static collectionPath() {
    return `${AskFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${AskFirestore.collectionPath()}/${id}`;
  }
}
