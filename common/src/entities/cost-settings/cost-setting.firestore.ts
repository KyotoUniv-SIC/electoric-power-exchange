import { FirestoreDataConverter } from 'firebase/firestore';
import { CostSetting } from './cost-setting';


export class CostSettingFirestore {
  static collectionID = 'cost_settings';
  static documentID = 'cost_setting_id';
  static virtualPath = `${CostSettingFirestore.collectionID}/{${CostSettingFirestore.documentID}}`;

  static converter: FirestoreDataConverter<CostSetting> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new CostSetting(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${CostSettingFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${CostSettingFirestore.collectionPath()}/${id}`;
  }
}
