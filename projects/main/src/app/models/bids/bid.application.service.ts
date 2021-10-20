import { BidService } from './bid.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BidApplicationService {
  constructor(private readonly bid: BidService) {}
}
