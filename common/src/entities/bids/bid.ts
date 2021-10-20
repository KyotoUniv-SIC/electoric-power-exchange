import { proto } from '@local/common';

export class Bid extends proto.main.BidRequest {
  validate() {
    return false;
  }
}
