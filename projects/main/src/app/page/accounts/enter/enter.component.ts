import { EnterOnSubmitEvent } from '../../../view/accounts/enter/enter.component';
import { Component, OnInit } from '@angular/core';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  constructor(private auth: AuthApplicationService) {}

  ngOnInit(): void {}

  async onSubmit($event: EnterOnSubmitEvent) {
    this.auth.signin({
      type: 'email',
      email: $event.mail,
      password: $event.password,
    });
  }
}
