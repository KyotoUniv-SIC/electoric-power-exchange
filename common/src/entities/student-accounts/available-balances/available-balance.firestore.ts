import { StudentAccountFirestore } from '..';
import { AvailableBalance } from './available-balance';
import { FirestoreDataConverter } from 'firebase/firestore';

export class AvailableBalanceFirestore {
  static collectionID = 'available_balances';
  static documentID = 'available_balance_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/{${AvailableBalanceFirestore.collectionID}/${AvailableBalanceFirestore.documentID}}`;

  static converter: FirestoreDataConverter<AvailableBalance> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new AvailableBalance(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${AvailableBalanceFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${AvailableBalanceFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
