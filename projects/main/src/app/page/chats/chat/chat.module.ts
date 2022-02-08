import { ChatModule } from '../../../view/chats/chat/chat.module';
import { MessageModule } from '../../../view/chats/chat/message/message.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [CommonModule, ChatRoutingModule, ChatModule, MessageModule],
})
export class AppChatModule {}
