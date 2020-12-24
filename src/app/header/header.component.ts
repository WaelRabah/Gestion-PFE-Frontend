import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import {Roles} from '../utils/guards/roles.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Gestion-PFE-Frontend';

  role;

  roles = Roles;
  constructor(public authentificationService: AuthentificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.role=this.authentificationService.getRole();
  }
  logout() {
    this.authentificationService.logout();
    this.router.navigate(['']);
  }
}
