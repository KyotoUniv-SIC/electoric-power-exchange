import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'],
})
export class ReferenceComponent implements OnInit {
  displayedColumns: string[] = ['classification', 'usage', 'unit', 'charge'];
  dataSource = [
    { classification: 'Minimum Charge', usage: 'Until the first 10 kWh', unit: 'Per Contract', charge: 341.01 },
    { classification: 'Energy Charge', usage: 'Over 10 kWh up to 120 kWh', unit: '1kWh', charge: 20.31 },
    { classification: 'Energy Charge', usage: 'Over 120 kWh up to 300 kWh', unit: '1kWh', charge: 25.71 },
    { classification: 'Energy Charge', usage: 'Over 300 kWh', unit: '1kWh', charge: 28.7 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
