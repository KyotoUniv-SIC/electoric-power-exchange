import { ChatsModule } from '../../view/chats/chats.module';
import { ChatComponent } from './chat/chat.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { MessageComponent } from './chat/message/message.component';

@NgModule({
  declarations: [ChatsComponent, ChatComponent, CreateComponent, MessageComponent],
  imports: [CommonModule, ChatsRoutingModule, ChatsModule],
})
export class AppChatsModule {}
