import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageDelete, StudentAccount } from '@local/common';
import { DeleteOnSubmitEvent } from 'projects/main/src/app/view/chats/chat/message/message.component';
import { MessageApplicationService } from 'projects/shared/src/lib/services/chats/messages/message.application.service';
import { MessageDeleteApplicationService } from 'projects/shared/src/lib/services/message-deletes/message-delete.application.service';
import { StudentAccountApplicationService } from 'projects/shared/src/lib/services/student-accounts/student-account.application.service';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  studentAccount$: Observable<StudentAccount> | undefined;
  message$: Observable<Message | undefined> | undefined;
  createdAt$: Observable<Date> | undefined;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private readonly studentAccApp: StudentAccountApplicationService,
    private readonly messageApp: MessageApplicationService,
    private readonly messageDeleteApp: MessageDeleteApplicationService,
  ) {
    const user$ = authState(this.auth);
    this.studentAccount$ = user$.pipe(mergeMap((user) => this.studentAccApp.getByUid$(user?.uid!)));
    const chatID$ = this.route.params.pipe(map((parames) => parames.chat_id));
    const messageID$ = this.route.params.pipe(map((parames) => parames.message_id));
    this.message$ = combineLatest([chatID$, messageID$]).pipe(mergeMap(([chatID, messageID]) => this.messageApp.get$(chatID, messageID)));
    this.createdAt$ = this.message$.pipe(map((message) => (message?.created_at as Timestamp).toDate()));
  }

  ngOnInit(): void {}

  async onSubmit($event: DeleteOnSubmitEvent) {
    await this.messageDeleteApp.create(new MessageDelete({ chat_id: $event.chatID, message_id: $event.messageID }));
  }
}
