import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hardship-bar-table',
  templateUrl: './hardship-bar-table.component.html',
  styleUrl: './hardship-bar-table.component.css',
})
export class HardshipBarTableComponent implements OnInit {
  careDetails = false;
  barValue: number | null = null;
  title: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute) {
    // this.careDetails = this.router.
  }
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      this.careDetails = event!.routerEvent?.url == '/care-details';
    });

    this.route.queryParams.subscribe((params) => {
      this.barValue = params['bar'];
      this.title = params['title'];
    });
  }
}
