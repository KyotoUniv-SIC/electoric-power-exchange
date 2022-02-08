import { ChatsComponent } from './chats.component';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: ':chat_id',
    loadChildren: () => import('./chat/chat.module').then((m) => m.AppChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
