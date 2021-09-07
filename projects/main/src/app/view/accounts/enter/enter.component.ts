import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
  @Input()
  enter?: Enter;
  
  constructor() {}

  ngOnInit(): void {}
}
