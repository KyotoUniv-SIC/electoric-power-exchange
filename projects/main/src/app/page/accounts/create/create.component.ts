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
  id: string;
  mail: string;
  password: string;
  passwordConfirmation: string;

  constructor(private session: SessionService) {
    this.id = '';
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
    this.account.email = this.mail;
    this.account.password = this.password;
    this.account.passwordConfirmation = this.passwordConfirmation;
    this.session.signup(this.account);
    this.account.reset();
  }
}
