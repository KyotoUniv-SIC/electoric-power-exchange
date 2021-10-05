import { SessionService } from '../../../models/session.service';
import { EnterOnSubmitEvent } from '../../../view/accounts/enter/enter.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  mail: string;
  password: string;

  constructor(private sessionService: SessionService) {
    this.mail = '';
    this.password = '';
  }

  ngOnInit(): void {}

  async onSubmit($event: EnterOnSubmitEvent) {
    this.sessionService.login();
  }
}
