import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableBidDelete } from './renewable-bid-delete';

export class RenewableBidDeleteFirestore {
  static collectionID = 'renewable_bid_deletes';
  static documentID = 'renewable_bid_delete_id';
  static virtualPath = `${RenewableBidDeleteFirestore.collectionID}/{${RenewableBidDeleteFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableBidDelete> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableBidDelete(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableBidDeleteFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableBidDeleteFirestore.collectionPath()}/${id}`;
  }
}
