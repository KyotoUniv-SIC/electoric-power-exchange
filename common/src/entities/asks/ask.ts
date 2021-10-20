import { proto } from '@local/common';

export class Ask extends proto.main.AskRequest {
  validate() {
    return false;
  }
}
