import { StudentAccountFirestore } from '..';
import { MonthlyPayment } from './monthly-payment';
import { FirestoreDataConverter } from 'firebase/firestore';

export class MonthlyPaymentFirestore {
  static collectionID = 'monthly_payments';
  static documentID = 'monthly_payment_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${MonthlyPaymentFirestore.collectionID}/{${MonthlyPaymentFirestore.documentID}}`;

  static converter: FirestoreDataConverter<MonthlyPayment> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new MonthlyPayment(data, data.created_at, data.updated_at);
    },
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${MonthlyPaymentFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${MonthlyPaymentFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
