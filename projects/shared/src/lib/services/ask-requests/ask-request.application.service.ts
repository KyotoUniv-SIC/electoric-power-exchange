import { AskRequestService } from './ask-request.service';
import { Injectable } from '@angular/core';
import { AskRequest } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class AskRequestApplicationService {
  constructor(private readonly askRequest: AskRequestService) {}

  create(data: AskRequest) {
    return this.askRequest.create(data);
  }
}
