import { Injectable } from '@angular/core';
import { ChatDeleteService } from './chat-delete.service';
import { ChatDelete } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class ChatDeleteApplicationService {
  
  constructor(private readonly chatDelete: ChatDeleteService) {}
}