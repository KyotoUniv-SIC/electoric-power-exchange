import { FirestoreDataConverter } from 'firebase/firestore';
import { BidRequest } from './bid-request';

export class BidRequestFirestore {
  static collectionID = 'bid_requests';
  static documentID = 'bid_request_id';
  static virtualPath = `${BidRequestFirestore.collectionID}/${BidRequestFirestore.documentID}`;

  static converter: FirestoreDataConverter<BidRequest> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new BidRequest(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${BidRequestFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${BidRequestFirestore.collectionPath()}/${id}`;
  }
}
