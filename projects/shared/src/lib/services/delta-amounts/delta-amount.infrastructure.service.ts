import { autoID } from '../auto-id';
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionGroup, query, QueryConstraint, doc, getDoc, docData, getDocs, collectionData, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { IDeltaAmountInfrastructureService } from './delta-amount.service';
import { DeltaAmount } from '@local/common';
import { DeltaAmountFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class DeltaAmountInfrastructureService
  implements IDeltaAmountInfrastructureService {

  constructor(private readonly firestore: Firestore) {}

  collection(...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, DeltaAmountFirestore.collectionPath());

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(DeltaAmountFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, DeltaAmountFirestore.collectionID);

    return (queryConstraints.length > 0
      ? query(ref, ...queryConstraints) : ref).withConverter(DeltaAmountFirestore.converter);
  }

  document(id?: string) {
    const ref = collection(this.firestore, DeltaAmountFirestore.collectionPath());

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, autoID())).withConverter(DeltaAmountFirestore.converter);
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

  create(data: DeltaAmount) {
    const doc = this.document(data.id);
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
