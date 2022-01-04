import { MarketStatus } from './market-status';
import { FirestoreDataConverter } from 'firebase/firestore';

export class MarketStatusFirestore {
  static collectionID = 'market_statuses';
  static documentID = 'market_status_id';
  static virtualPath = `${MarketStatusFirestore.collectionID}/{${MarketStatusFirestore.documentID}}`;

  static converter: FirestoreDataConverter<MarketStatus> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MarketStatus(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${MarketStatusFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${MarketStatusFirestore.collectionPath()}/${id}`;
  }
}
