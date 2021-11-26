import { NormalBidService } from './normal-bid.service';
import { Injectable } from '@angular/core';
import { NormalBid } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalBidApplicationService {
  constructor(private readonly normalBid: NormalBidService) {}

  create(data: NormalBid) {
    return this.normalBid.create(data);
  }
}
