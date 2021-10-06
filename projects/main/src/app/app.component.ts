import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'main';
  hiddenPath: string[] = ['accounts', 'txs', 'messages'];
  hidden!: boolean;
  constructor(public router: Router) {}
  ngOnInit() {
    this.router.events.pipe(filter((f) => f instanceof NavigationEnd)).subscribe((s: any) => {
      this.hidden = this.hiddenPath.some((e) => s.url.includes(e));
    });
  }
}
