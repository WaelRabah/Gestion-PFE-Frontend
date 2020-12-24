import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion-PFE-Frontend';
  loggedIn=false;
  constructor(private authService:AuthentificationService){

  }
  ngOnInit(){
    this.loggedIn = this.authService.isAuthenticated();
    console.log(this.loggedIn);
  }
 
}
