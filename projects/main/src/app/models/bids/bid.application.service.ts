import { BidService } from './bid.service';
import { Injectable } from '@angular/core';
import { proto } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class BidApplicationService {
  constructor(private readonly bid: BidService) {}

  async create(data: proto.main.BidRequest) {
    this.bid.create(data);
  }
}
