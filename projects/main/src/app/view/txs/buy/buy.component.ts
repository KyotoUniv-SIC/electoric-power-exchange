import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  @Input()
  buy?: Buy;
  
  constructor() {}

  ngOnInit(): void {}
}
