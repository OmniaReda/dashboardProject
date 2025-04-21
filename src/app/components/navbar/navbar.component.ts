import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentPage: string = '';
  previousPage: string = '';
  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //via versa -__-
        this.previousPage = this.currentPage;
        this.currentPage = event.urlAfterRedirects;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
