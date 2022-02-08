import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Chat, Message, StudentAccount } from '@local/common';
import { ChatApplicationService } from 'projects/shared/src/lib/services/chats/chat.application.service';
import { MessageApplicationService } from 'projects/shared/src/lib/services/chats/messages/message.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  chat$: Observable<Chat | undefined> | undefined;
  messages$: Observable<Message[]> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly chatApp: ChatApplicationService,
    private readonly messageApp: MessageApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const chatID$ = this.route.params.pipe(map((parames) => parames.chat_id));
    this.chat$ = chatID$.pipe(mergeMap((chatID) => this.chatApp.get$(chatID)));
    this.messages$ = chatID$.pipe(mergeMap((chatID) => this.messageApp.list$(chatID)));
  }

  ngOnInit(): void {}
}
