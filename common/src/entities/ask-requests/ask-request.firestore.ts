import { FirestoreDataConverter } from 'firebase/firestore';
import { AskRequest } from './ask-request';

export class AskRequestFirestore {
  static collectionID = 'ask_requests';
  static documentID = 'ask_request_id';
  static virtualPath = `${AskRequestFirestore.collectionID}/${AskRequestFirestore.documentID}`;

  static converter: FirestoreDataConverter<AskRequest> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AskRequest(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${AskRequestFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${AskRequestFirestore.collectionPath()}/${id}`;
  }
}
