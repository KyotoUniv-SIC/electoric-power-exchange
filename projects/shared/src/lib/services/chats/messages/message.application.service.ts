import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from '@local/common';

@Injectable({
  providedIn: 'root',
})
export class MessageApplicationService {
  
  constructor(private readonly message: MessageService) {}
}