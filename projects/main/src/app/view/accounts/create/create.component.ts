import { Select } from '../room/room.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type CreateOnSubmitEvent = {
  name: string;
  mail: string;
  password: string;
  passwordConfirmation: string;
  building: string;
  room: string;
};

@Component({
  selector: 'view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Input()
  name?: string | null;

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

  dormitories: Select[] = [
    { value: 'higashi', viewValue: '東一条館' },
    { value: 'koushi', viewValue: '廣志房' },
    { value: 'sentetsu', viewValue: '船哲房' },
  ];
  // higashiitizyokan 301-320
  higashiRooms: Select[] = [
    { value: '301', viewValue: '301号室' },
    { value: '302', viewValue: '302号室' },
    { value: '303', viewValue: '303号室' },
    { value: '304', viewValue: '304号室' },
    { value: '305', viewValue: '305号室' },
    { value: '306', viewValue: '306号室' },
    { value: '307', viewValue: '307号室' },
    { value: '308', viewValue: '308号室' },
    { value: '309', viewValue: '309号室' },
    { value: '310', viewValue: '310号室' },
    { value: '311', viewValue: '311号室' },
    { value: '312', viewValue: '312号室' },
    { value: '313', viewValue: '313号室' },
    { value: '314', viewValue: '314号室' },
    { value: '315', viewValue: '315号室' },
    { value: '316', viewValue: '316号室' },
    { value: '317', viewValue: '317号室' },
    { value: '318', viewValue: '318号室' },
    { value: '319', viewValue: '319号室' },
    { value: '320', viewValue: '320号室' },
  ];
  // koushibou 101-104, 201-211, 301-311
  koushiRooms: Select[] = [
    { value: '101', viewValue: '101号室' },
    { value: '102', viewValue: '102号室' },
    { value: '103', viewValue: '103号室' },
    { value: '104', viewValue: '104号室' },
    { value: '201', viewValue: '301号室' },
    { value: '202', viewValue: '302号室' },
    { value: '203', viewValue: '303号室' },
    { value: '204', viewValue: '304号室' },
    { value: '205', viewValue: '305号室' },
    { value: '206', viewValue: '306号室' },
    { value: '207', viewValue: '307号室' },
    { value: '208', viewValue: '308号室' },
    { value: '209', viewValue: '309号室' },
    { value: '210', viewValue: '310号室' },
    { value: '211', viewValue: '311号室' },
    { value: '301', viewValue: '301号室' },
    { value: '302', viewValue: '302号室' },
    { value: '303', viewValue: '303号室' },
    { value: '304', viewValue: '304号室' },
    { value: '305', viewValue: '305号室' },
    { value: '306', viewValue: '306号室' },
    { value: '307', viewValue: '307号室' },
    { value: '308', viewValue: '308号室' },
    { value: '309', viewValue: '309号室' },
    { value: '310', viewValue: '310号室' },
    { value: '311', viewValue: '311号室' },
  ];
  // sentetsubou 201-211, 301-311, 401-406
  sentetsuRooms: Select[] = [
    { value: '201', viewValue: '301号室' },
    { value: '202', viewValue: '302号室' },
    { value: '203', viewValue: '303号室' },
    { value: '204', viewValue: '304号室' },
    { value: '205', viewValue: '305号室' },
    { value: '206', viewValue: '306号室' },
    { value: '207', viewValue: '307号室' },
    { value: '208', viewValue: '308号室' },
    { value: '209', viewValue: '309号室' },
    { value: '210', viewValue: '310号室' },
    { value: '211', viewValue: '311号室' },
    { value: '301', viewValue: '301号室' },
    { value: '302', viewValue: '302号室' },
    { value: '303', viewValue: '303号室' },
    { value: '304', viewValue: '304号室' },
    { value: '305', viewValue: '305号室' },
    { value: '306', viewValue: '306号室' },
    { value: '307', viewValue: '307号室' },
    { value: '308', viewValue: '308号室' },
    { value: '309', viewValue: '309号室' },
    { value: '310', viewValue: '310号室' },
    { value: '311', viewValue: '311号室' },
    { value: '401', viewValue: '401号室' },
    { value: '402', viewValue: '402号室' },
    { value: '403', viewValue: '403号室' },
    { value: '404', viewValue: '404号室' },
    { value: '405', viewValue: '405号室' },
    { value: '406', viewValue: '406号室' },
  ];

  ngOnInit(): void {}

  onSubmit(name: string, mail: string, password: string, passwordConfirmation: string, building: string, room: string) {
    this.isPasswordVisible = false;
    if (password !== passwordConfirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.appSubmit.emit({ name, mail, password, passwordConfirmation, building, room });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    return false;
  }
}
