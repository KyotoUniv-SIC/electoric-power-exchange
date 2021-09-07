import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @Input()
  view?: View;
  
  constructor() {}

  ngOnInit(): void {}
}
