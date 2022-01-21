import { Injectable } from '@angular/core';
import { NormalAskDeleteService } from './normal-ask-delete.service';
import { NormalAskDelete } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class NormalAskDeleteApplicationService {
  
  constructor(private readonly normalAskDelete: NormalAskDeleteService) {}
}