import { Password } from '../../../models/session.model';
import { SessionService } from '../../../models/session.service';
import { CreateOnSubmitEvent } from '../../../view/accounts/create/create.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public account = new Password();
  name: string;
  mail: string;
  password: string;
  passwordConfirmation: string;

  constructor(private session: SessionService) {
    this.name = '';
    this.mail = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  ngOnInit(): void {}

  async onSubmit($event: CreateOnSubmitEvent) {
    if (this.password !== this.passwordConfirmation) {
      alert('Password mismatch');
      return;
    }
    this.account.name = $event.name;
    this.account.email = $event.mail;
    this.account.password = $event.password;
    this.account.passwordConfirmation = $event.passwordConfirmation;
    // console.log(this.account);
    this.session.signup(this.account);
    // this.account.reset();
  }
}
