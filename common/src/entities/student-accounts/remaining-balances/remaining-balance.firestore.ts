import { StudentAccountFirestore } from '../.';
import { RemainingBalance } from './remaining-balance';
import { FirestoreDataConverter } from 'firebase/firestore';

export class RemainingBalanceFirestore {
  static collectionID = 'remaining_balances';
  static documentID = 'remaining_balance_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${RemainingBalanceFirestore.collectionID}/${RemainingBalanceFirestore.documentID}`;

  static converter: FirestoreDataConverter<RemainingBalance> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RemainingBalance(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${RemainingBalanceFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${RemainingBalanceFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
