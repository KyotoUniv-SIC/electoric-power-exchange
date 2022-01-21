import { Injectable } from '@angular/core';
import { RenewableAskDeleteService } from './renewable-ask-delete.service';
import { RenewableAskDelete } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class RenewableAskDeleteApplicationService {
  
  constructor(private readonly renewableAskDelete: RenewableAskDeleteService) {}
}