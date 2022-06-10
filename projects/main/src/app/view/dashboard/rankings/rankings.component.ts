import { Ranking } from '../../../page/dashboard/dashboard.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css'],
})
export class RankingsComponent implements OnInit {
  @Input()
  rankings?: Ranking[] | null;
  @Input()
  rank?: number | null;

  constructor() {}

  ngOnInit(): void {}
}
