import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IRenewableAskHistoryInfrastructureService } from './renewable-ask-history.service';
import { RenewableAskHistory } from '@local/common';
import { RenewableAskHistoryFirestore } from '@local/common';
import { autoID } from '../auto-id';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskHistoryInfrastructureService
  implements IRenewableAskHistoryInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, RenewableAskHistoryFirestore.collectionPath());

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(RenewableAskHistoryFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, RenewableAskHistoryFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(RenewableAskHistoryFirestore.converter);
  }

  document(id?: string) {
    const ref = collection(this.firestore, RenewableAskHistoryFirestore.collectionPath());

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, autoID())).withConverter(RenewableAskHistoryFirestore.converter);
  }

  get(id: string) {
    return getDoc(this.document(id))
      .then(snapshot => snapshot.data());
  }

  get$(id: string) {
    return docData(this.document(id));
  }

  list() {
    return getDocs(this.collection())
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  list$() {
    return collectionData(this.collection());
  }

  listGroup() {
    return getDocs(this.collectionGroup())
      .then(snapshots => snapshots.docs.map(doc => doc.data()))
  }

  listGroup$() {
    return collectionData(this.collectionGroup());
  }

  create(data: RenewableAskHistory) {
    const doc = this.document();
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
