import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion-PFE-Frontend';
  loggedIn=false;
  constructor(private authService :AuthentificationService,private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
          this.loggedIn = this.authService.isAuthenticated();
       }
    });
  }

  ngOnInit(): void {
    this.authService.checkToken();
    this.loggedIn=this.authService.isAuthenticated();
  }
}
