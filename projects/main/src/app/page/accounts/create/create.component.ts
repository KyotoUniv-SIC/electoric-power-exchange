import { CreateOnSubmitEvent } from '../../../view/accounts/create/create.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  id: string;
  mail: string;
  password: string;

  constructor() {
    this.id = '';
    this.mail = '';
    this.password = '';
  }

  ngOnInit(): void {}

  async onSubmit($event: CreateOnSubmitEvent) {
    // await this.idApplication.create($event.id, $event.mail, $event.password);
  }
}
