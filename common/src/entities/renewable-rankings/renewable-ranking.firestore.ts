import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableRanking } from './renewable-ranking';


export class RenewableRankingFirestore {
  static collectionID = 'renewable_rankings';
  static documentID = 'renewable_ranking_id';
  static virtualPath = `${RenewableRankingFirestore.collectionID}/{${RenewableRankingFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableRanking> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableRanking(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableRankingFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableRankingFirestore.collectionPath()}/${id}`;
  }
}
