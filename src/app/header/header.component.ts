import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Gestion-PFE-Frontend';
  administrateur=true;
  enseignant=false;
  etudiant=false;
  constructor(public authentificationService: AuthentificationService,
    private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authentificationService.logout();
    this.router.navigate(['']);
    console.log("logout")
  }
}
