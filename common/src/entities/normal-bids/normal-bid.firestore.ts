import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalBid } from './normal-bid';

export class NormalBidFirestore {
  static collectionID = 'normal_bids';
  static documentID = 'normal_bid_id';
  static virtualPath = `${NormalBidFirestore.collectionID}/${NormalBidFirestore.documentID}`;

  static converter: FirestoreDataConverter<NormalBid> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalBid(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalBidFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalBidFirestore.collectionPath()}/${id}`;
  }
}
