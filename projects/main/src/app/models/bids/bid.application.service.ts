import { Injectable } from '@angular/core';
import { BidService } from './bid.service';
import { Bid } from 'common';

@Injectable({
  providedIn: 'root',
})
export class BidApplicationService {
  
  constructor(private readonly bid: BidService) {}
}