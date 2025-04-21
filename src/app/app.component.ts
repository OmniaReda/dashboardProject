import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dashboard';

  loading: boolean = true;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {

    // Scroll to top on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loader()
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

   
  }

  loader(){
 // Loading
 this.loading = true
 this.router.events.subscribe((event) => {
  setTimeout(() => {
    this.loading = false;
  }, 2000)

});
  }

}
