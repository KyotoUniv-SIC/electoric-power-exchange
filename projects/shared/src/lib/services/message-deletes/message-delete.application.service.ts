import { Injectable } from '@angular/core';
import { MessageDeleteService } from './message-delete.service';
import { MessageDelete } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MessageDeleteApplicationService {
  
  constructor(private readonly messageDelete: MessageDeleteService) {}
}