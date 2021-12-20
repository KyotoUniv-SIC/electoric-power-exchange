import { Component, Input, OnInit } from '@angular/core';
import { proto } from '@local/common';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'view-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  account?: proto.main.StudentAccount | null;
  @Input()
  usage?: proto.main.MonthlyUsage | null;
  @Input()
  balances?: any | null;

  a: [10, 30, 45] | undefined;
  doughnutChartLabels: Label[] = ['jQuey', 'React', 'Vue', 'Angular'];
  doughnutChartData: MultiDataSet = [[
    40, 30, 25, 5],
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void { }
}
