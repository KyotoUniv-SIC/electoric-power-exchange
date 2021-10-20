import { FirestoreDataConverter } from 'firebase/firestore';
import { Bid } from './bid';

export class BidFirestore {
  static collectionID = 'bids';
  static documentID = 'bid_id';
  static virtualPath = `${BidFirestore.collectionID}/${BidFirestore.documentID}`;

  static converter: FirestoreDataConverter<Bid> = {
    toFirestore: (data) => ({...data}),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Bid(data);
    }
  };

  static collectionPath() {
    return `${BidFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${BidFirestore.collectionPath()}/${id}`;
  }
}
