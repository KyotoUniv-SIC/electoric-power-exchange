import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IMonthlyPaymentInfrastructureService } from './monthly-payment.service';
import { MonthlyPayment } from '@local/common';
import { MonthlyPaymentFirestore } from '@local/common';
import { autoID } from '../../auto-id';

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentInfrastructureService
  implements IMonthlyPaymentInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(studentAccountID: string, ...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, MonthlyPaymentFirestore.collectionPath(studentAccountID));

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(MonthlyPaymentFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, MonthlyPaymentFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(MonthlyPaymentFirestore.converter);
  }

  document(studentAccountID: string, id?: string) {
    const ref = collection(this.firestore, MonthlyPaymentFirestore.collectionPath(studentAccountID));

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, autoID())).withConverter(MonthlyPaymentFirestore.converter);
  }

  get(studentAccountID: string, id: string) {
    return getDoc(this.document(studentAccountID, id))
      .then(snapshot => snapshot.data());
  }

  get$(studentAccountID: string, id: string) {
    return docData(this.document(studentAccountID, id));
  }

  list(studentAccountID: string) {
    return getDocs(this.collection(studentAccountID))
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  list$(studentAccountID: string) {
    return collectionData(this.collection(studentAccountID));
  }

  listGroup() {
    return getDocs(this.collectionGroup())
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  listGroup$() {
    return collectionData(this.collectionGroup());
  }

  create(data: MonthlyPayment) {
    const doc = this.document(data.student_account_id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
