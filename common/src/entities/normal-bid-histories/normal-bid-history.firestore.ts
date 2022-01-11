import { NormalBidHistory } from './normal-bid-history';
import { FirestoreDataConverter } from 'firebase/firestore';

export class NormalBidHistoryFirestore {
  static collectionID = 'normal_bid_histories';
  static documentID = 'normal_bid_history_id';
  static virtualPath = `${NormalBidHistoryFirestore.collectionID}/{${NormalBidHistoryFirestore.documentID}}`;

  static converter: FirestoreDataConverter<NormalBidHistory> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalBidHistory(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${NormalBidHistoryFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalBidHistoryFirestore.collectionPath()}/${id}`;
  }
}
