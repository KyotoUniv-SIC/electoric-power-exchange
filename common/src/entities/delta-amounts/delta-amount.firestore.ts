import { FirestoreDataConverter } from 'firebase/firestore';
import { DeltaAmount } from './delta-amount';


export class DeltaAmountFirestore {
  static collectionID = 'delta_amounts';
  static documentID = 'delta_amount_id';
  static virtualPath = `${DeltaAmountFirestore.collectionID}/{${DeltaAmountFirestore.documentID}}`;

  static converter: FirestoreDataConverter<DeltaAmount> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new DeltaAmount(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${DeltaAmountFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${DeltaAmountFirestore.collectionPath()}/${id}`;
  }
}
