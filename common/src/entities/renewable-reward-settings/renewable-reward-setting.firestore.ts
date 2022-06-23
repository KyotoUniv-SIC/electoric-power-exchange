import { FirestoreDataConverter } from 'firebase/firestore';
import { RenewableRewardSetting } from './renewable-reward-setting';


export class RenewableRewardSettingFirestore {
  static collectionID = 'renewable_reward_settings';
  static documentID = 'renewable_reward_setting_id';
  static virtualPath = `${RenewableRewardSettingFirestore.collectionID}/{${RenewableRewardSettingFirestore.documentID}}`;

  static converter: FirestoreDataConverter<RenewableRewardSetting> = {
    toFirestore: (data) => ({ ...data }),
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return new RenewableRewardSetting(data, data.created_at, data.updated_at);
    }
  };

  static collectionPath() {
    return `${RenewableRewardSettingFirestore.collectionID}`;
  }

  static documentPath(id: string) {
    return `${RenewableRewardSettingFirestore.collectionPath()}/${id}`;
  }
}
