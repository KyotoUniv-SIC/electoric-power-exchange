import { BidService } from './bid.service';
import { Injectable } from '@angular/core';
import { BidRequest } from 'common/src/entities/bids';

@Injectable({
  providedIn: 'root',
})
export class BidApplicationService {
  constructor(private readonly bid: BidService) {}

  async create(data: BidRequest) {
    this.bid.create(data);
  }
}
