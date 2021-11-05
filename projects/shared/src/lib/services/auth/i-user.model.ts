import { Timestamp } from '@angular/fire/firestore';

export type IUser = {
  id: string;
  current_account_id: string;
  account_ids_order: string[];
  created_at: Timestamp;
  updated_at: Timestamp;

  is_admin?: boolean;
}
