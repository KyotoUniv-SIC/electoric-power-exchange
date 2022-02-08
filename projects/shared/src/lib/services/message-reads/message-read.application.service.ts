import { Injectable } from '@angular/core';
import { MessageReadService } from './message-read.service';
import { MessageRead } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MessageReadApplicationService {
  
  constructor(private readonly messageRead: MessageReadService) {}
}