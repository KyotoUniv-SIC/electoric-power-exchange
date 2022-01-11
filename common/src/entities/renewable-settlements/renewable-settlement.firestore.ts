import { RenewableSettlement } from './renewable-settlement';
import { FirestoreDataConverter } from 'firebase/firestore';

export class RenewableSettlementFirestore {
  static collectionID = 'renewable_settlements';
  static documentID = 'renewable_settlement_id';
  static virtualPath = `${RenewableSettlementFirestore.collectionID}/{${RenewableSettlementFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableSettlement> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableSettlement(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath() {
    return `${RenewableSettlementFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableSettlementFirestore.collectionPath()}/${id}`;
  }
}
