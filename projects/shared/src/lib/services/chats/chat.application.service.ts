import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';
import { Chat } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class ChatApplicationService {
  constructor(private readonly chat: ChatService) {}
}
