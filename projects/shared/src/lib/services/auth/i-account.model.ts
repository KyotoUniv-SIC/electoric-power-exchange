import { Timestamp } from '@angular/fire/firestore';

export type IAccount = {
  id: string;
  user_ids: string[];
  admin_user_ids: string[];
  name: string;
  image_url: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};
