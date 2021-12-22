import { CreateOnSubmitEvent } from '../../../view/accounts/create/create.component';
import { Component, OnInit } from '@angular/core';
import { AuthApplicationService } from 'projects/shared/src/lib/services/auth/auth.application.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private auth: AuthApplicationService) {}

  ngOnInit(): void {}

  async onSubmit($event: CreateOnSubmitEvent) {
    this.auth.signup(
      {
        type: 'email',
        name: $event.name,
        email: $event.mail,
        password: $event.password,
      },
      $event.name,
    );
  }
}
