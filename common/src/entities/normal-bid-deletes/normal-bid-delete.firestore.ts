import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalBidDelete } from './normal-bid-delete';

export class NormalBidDeleteFirestore {
  static collectionID = 'normal_bid_deletes';
  static documentID = 'normal_bid_delete_id';
  static virtualPath = `${NormalBidDeleteFirestore.collectionID}/{${NormalBidDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<NormalBidDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalBidDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalBidDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalBidDeleteFirestore.collectionPath()}/${id}`;
  }
}
