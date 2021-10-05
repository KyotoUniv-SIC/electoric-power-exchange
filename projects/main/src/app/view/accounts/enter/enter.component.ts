import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type EnterOnSubmitEvent = {
  mail: string;
  password: string;
};

@Component({
  selector: 'view-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  @Input()
  mail?: string | null;

  @Input()
  password?: string | null;

  @Output()
  appSubmit: EventEmitter<EnterOnSubmitEvent>;

  isPasswordVisible: boolean = false;

  constructor() {
    this.appSubmit = new EventEmitter();
  }

  ngOnInit(): void {}

  onSubmit(mail: string, password: string) {
    this.isPasswordVisible = false;
    this.appSubmit.emit({ mail, password });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    return false;
  }
}
