import { RenewableBidHistory } from './renewable-bid-history';
import { FirestoreDataConverter } from 'firebase/firestore';

export class RenewableBidHistoryFirestore {
  static collectionID = 'renewable_bid_histories';
  static documentID = 'renewable_bid_history_id';
  static virtualPath = `${RenewableBidHistoryFirestore.collectionID}/{${RenewableBidHistoryFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableBidHistory> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableBidHistory(data, data.bid_created_at, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${RenewableBidHistoryFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableBidHistoryFirestore.collectionPath()}/${id}`;
  }
}
