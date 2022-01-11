import { StudentAccountFirestore } from '../.';
import { Balance } from './balance';
import { FirestoreDataConverter } from 'firebase/firestore';

export class BalanceFirestore {
  static collectionID = 'balances';
  static documentID = 'balance_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${BalanceFirestore.collectionID}/{${BalanceFirestore.documentID}}`;

  static converter: FirestoreDataConverter<Balance> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new Balance(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${BalanceFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${BalanceFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
