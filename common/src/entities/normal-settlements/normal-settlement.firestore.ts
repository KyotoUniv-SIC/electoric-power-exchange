import { FirestoreDataConverter } from 'firebase/firestore';
import { NormalSettlement } from './normal-settlement';

export class NormalSettlementFirestore {
  static collectionID = 'normal_settlements';
  static documentID = 'normal_settlement_id';
  static virtualPath = `${NormalSettlementFirestore.collectionID}/${NormalSettlementFirestore.documentID}`;

  static converter: FirestoreDataConverter<NormalSettlement> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new NormalSettlement(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${NormalSettlementFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${NormalSettlementFirestore.collectionPath()}/${id}`;
  }
}
