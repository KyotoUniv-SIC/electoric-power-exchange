import { PrimaryBid } from './primary-bid';
import { FirestoreDataConverter } from 'firebase/firestore';

export class PrimaryBidFirestore {
  static collectionID = 'primary_bids';
  static documentID = 'primary_bid_id';
  static virtualPath = `${PrimaryBidFirestore.collectionID}/{${PrimaryBidFirestore.documentID}}`;

  static converter: FirestoreDataConverter<PrimaryBid> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new PrimaryBid(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${PrimaryBidFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${PrimaryBidFirestore.collectionPath()}/${id}`;
  }
}
