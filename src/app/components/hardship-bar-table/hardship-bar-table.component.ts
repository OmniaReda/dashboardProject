import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-hardship-bar-table',
  templateUrl: './hardship-bar-table.component.html',
  styleUrl: './hardship-bar-table.component.css',
})
export class HardshipBarTableComponent implements OnInit {
  careDetails = false;

  constructor(private router: Router) {
    // this.careDetails = this.router.
  }
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      this.careDetails = event!.routerEvent?.url == '/care-details';
    });
  }
}
