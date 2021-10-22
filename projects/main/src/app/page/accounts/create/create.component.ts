import { AuthApplicationService } from '../../../models/auth/auth.application.service';
import { Password } from '../../../models/auth/auth.model';
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

  constructor(private auth: AuthApplicationService) {
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
    this.auth.signup(this.account);
    // this.account.reset();
  }
}
