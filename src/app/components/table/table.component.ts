import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
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
