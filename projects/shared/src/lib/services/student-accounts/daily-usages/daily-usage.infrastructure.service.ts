import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IDailyUsageInfrastructureService } from './daily-usage.service';
import { DailyUsage } from '@local/common';
import { DailyUsageFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class DailyUsageInfrastructureService
  implements IDailyUsageInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(studentAccountID: string, ...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, DailyUsageFirestore.collectionPath(studentAccountID));

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(DailyUsageFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, DailyUsageFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(DailyUsageFirestore.converter);
  }

  document(studentAccountID: string, id?: string) {
    const ref = collection(this.firestore, DailyUsageFirestore.collectionPath(studentAccountID));

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path)).withConverter(DailyUsageFirestore.converter);
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

  create(data: DailyUsage) {
    const doc = this.document(data.student_account_id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
