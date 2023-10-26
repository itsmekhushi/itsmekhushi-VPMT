import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent implements OnInit {
  isLoginPage = true;
  title = 'vpmt';
  sideNavStatus: boolean = false
  authService: any;
  showSidebar = true
  routeChange: any;
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/') {
          this.isLoginPage = true
        } else {
          this.isLoginPage = false
        }
      }
    })
  }
}


