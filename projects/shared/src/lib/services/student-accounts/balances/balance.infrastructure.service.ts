import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IBalanceInfrastructureService } from './balance.service';
import { Balance } from '@local/common';
import { BalanceFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class BalanceInfrastructureService
  implements IBalanceInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(studentAccountID: string, ...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, BalanceFirestore.collectionPath(studentAccountID));

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(BalanceFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, BalanceFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(BalanceFirestore.converter);
  }

  document(studentAccountID: string, id?: string) {
    const ref = collection(this.firestore, BalanceFirestore.collectionPath(studentAccountID));

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path)).withConverter(BalanceFirestore.converter);
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

  create(data: Balance) {
    const doc = this.document(data.student_account_id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
