import { AutoId } from '../auto-id';
import { INormalBidInfrastructureService } from './normal-bid.service';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionGroup,
  query,
  QueryConstraint,
  doc,
  getDoc,
  docData,
  getDocs,
  collectionData,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { NormalBid } from '@local/common';
import { NormalBidFirestore } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalBidInfrastructureService implements INormalBidInfrastructureService {
  constructor(private readonly firestore: Firestore) {}

  collection(...queryConstraints: QueryConstraint[]) {
    const ref = collection(this.firestore, NormalBidFirestore.collectionPath());

    return (queryConstraints.length > 0 ? query(ref, ...queryConstraints) : ref).withConverter(NormalBidFirestore.converter);
  }

  collectionGroup(...queryConstraints: QueryConstraint[]) {
    const ref = collectionGroup(this.firestore, NormalBidFirestore.collectionID);

    return (queryConstraints.length > 0 ? query(ref, ...queryConstraints) : ref).withConverter(NormalBidFirestore.converter);
  }

  document(id?: string) {
    const ref = collection(this.firestore, NormalBidFirestore.collectionPath());

    return (id ? doc(this.firestore, ref.path, id) : doc(this.firestore, ref.path, AutoId())).withConverter(NormalBidFirestore.converter);
  }

  get(id: string) {
    return getDoc(this.document(id)).then((snapshot) => snapshot.data());
  }

  get$(id: string) {
    return docData(this.document(id));
  }

  list() {
    return getDocs(this.collection()).then((snapshots) => snapshots.docs.map((doc) => doc.data()));
  }

  list$() {
    return collectionData(this.collection());
  }

  listGroup() {
    return getDocs(this.collectionGroup()).then((snapshots) => snapshots.docs.map((doc) => doc.data()));
  }

  listGroup$() {
    return collectionData(this.collectionGroup());
  }

  create(data: NormalBid) {
    const doc = this.document();
    data.id = doc.id;

    const now = serverTimestamp();
    data.created_at = now;
    data.updated_at = now;

    return setDoc(doc, data);
  }
}
