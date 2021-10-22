import { BidRequest } from './bid';
import { FirestoreDataConverter } from 'firebase/firestore';

export class BidFirestore {
  static collectionID = 'bids';
  static documentID = 'bid_id';
  static virtualPath = `${BidFirestore.collectionID}/${BidFirestore.documentID}`;

  static converter: FirestoreDataConverter<BidRequest> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new BidRequest(data);
    },
  };

  static collectionPath() {
    return `${BidFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${BidFirestore.collectionPath()}/${id}`;
  }
}
