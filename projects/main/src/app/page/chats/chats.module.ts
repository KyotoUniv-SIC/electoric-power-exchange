import { ChatsModule } from '../../view/chats/chats.module';
import { ChatComponent } from './chat/chat.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ChatsComponent, ChatComponent],
  imports: [CommonModule, ChatsRoutingModule, ChatsModule],
})
export class AppChatsModule {}
