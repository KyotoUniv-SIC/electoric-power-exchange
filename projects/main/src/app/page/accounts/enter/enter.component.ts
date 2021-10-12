import { AuthApplicationService } from '../../../models/auth/auth.application.service';
import { Password } from '../../../models/auth/auth.model';
import { EnterOnSubmitEvent } from '../../../view/accounts/enter/enter.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  public account = new Password();
  mail: string;
  password: string;

  constructor(private authApp: AuthApplicationService) {
    this.mail = '';
    this.password = '';
  }

  ngOnInit(): void {}

  async onSubmit($event: EnterOnSubmitEvent) {
    this.account.email = $event.mail;
    this.account.password = $event.password;
    this.authApp.login(this.account);
  }
}
