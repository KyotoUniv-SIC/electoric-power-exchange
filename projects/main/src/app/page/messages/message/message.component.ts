import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  messageID$: Observable<string>;
  message$: Observable<Message>;

  constructor(private message: MessageService) {
    this.messageID$ = this.route.params.pipe(
      map(params => params['message_id']),
    );
    this.message$ = this.messageID$.pipe(
      mergeMap(id => this.message.get$(id)),
    );
  }

  ngOnInit(): void {}
}
