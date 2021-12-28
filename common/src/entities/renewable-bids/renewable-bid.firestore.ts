import { RenewableBid } from './renewable-bid';
import { FirestoreDataConverter } from 'firebase/firestore';

export class RenewableBidFirestore {
  static collectionID = 'renewable_bids';
  static documentID = 'renewable_bid_id';
  static virtualPath = `${RenewableBidFirestore.collectionID}/{${RenewableBidFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableBid> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableBid(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${RenewableBidFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableBidFirestore.collectionPath()}/${id}`;
  }
}
