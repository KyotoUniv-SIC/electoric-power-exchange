import { FirestoreDataConverter } from 'firebase/firestore';
import { InsufficientBalance } from './insufficient-balance';
import { StudentAccountFirestore } from '..';

export class InsufficientBalanceFirestore {
  static collectionID = 'insufficient_balances';
  static documentID = 'insufficient_balance_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${InsufficientBalanceFirestore.collectionID}/{${InsufficientBalanceFirestore.documentID}}`;

  static converter: FirestoreDataConverter<InsufficientBalance> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new InsufficientBalance(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${InsufficientBalanceFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${InsufficientBalanceFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
