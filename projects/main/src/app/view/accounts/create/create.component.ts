import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type CreateOnSubmitEvent = {
  id: string;
  mail: string;
  password: string;
  passwordConfirmation: string;
};

@Component({
  selector: 'view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Input()
  id?: string | null;

  @Input()
  mail?: string | null;

  @Input()
  password?: string | null;

  @Input()
  passwordConfirmation?: string | null;

  @Output()
  appSubmit: EventEmitter<CreateOnSubmitEvent>;

  isPasswordVisible: boolean = false;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(id: string, mail: string, password: string, passwordConfirmation: string) {
    this.isPasswordVisible = false;
    this.appSubmit.emit({ id, mail, password, passwordConfirmation });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    return false;
  }
}
