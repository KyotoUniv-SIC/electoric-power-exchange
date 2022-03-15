import { FirestoreDataConverter } from 'firebase/firestore';
import { DailyPayment } from './daily-payment';
import { StudentAccountFirestore } from '..';


export class DailyPaymentFirestore {
  static collectionID = 'daily_payments';
  static documentID = 'daily_payment_id';
  static virtualPath = `${StudentAccountFirestore.virtualPath}/${DailyPaymentFirestore.collectionID}/{${DailyPaymentFirestore.documentID}}`;

  static converter: FirestoreDataConverter<DailyPayment> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new DailyPayment(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath(studentAccountID: string) {
    return `${StudentAccountFirestore.documentPath(studentAccountID)}/${DailyPaymentFirestore.collectionID}`;
  }

  static documentPath(studentAccountID: string, id: string) {
    return `${DailyPaymentFirestore.collectionPath(studentAccountID)}/${id}`;
  }
}
