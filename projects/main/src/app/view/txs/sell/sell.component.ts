import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  @Input()
  sell?: Sell;
  
  constructor() {}

  ngOnInit(): void {}
}
