import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Input()
  create?: Create;
  
  constructor() {}

  ngOnInit(): void {}
}
