import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { EtudiantService } from '../etudiant/services/etudiant.service';
import {Roles} from '../utils/guards/roles.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Gestion-PFE-Frontend';

  role;

  showAjouterSujet;
  showUploadRapport;

  roles = Roles;
  constructor(public authentificationService: AuthentificationService,
    private etudiantService: EtudiantService,
    private router: Router) { }

  ngOnInit(): void {
    this.role=this.authentificationService.getRole();
    if(this.role==this.roles.etudiant){
      this.etudiantService.getSujetStatus().subscribe({
        next: data => {this.showAjouterSujet = data }
      });

      this.etudiantService.getRapportStatus().subscribe({
        next: data => {this.showUploadRapport = data;}
      })
    }

  }
  logout() {
    this.authentificationService.logout();
    this.router.navigate(['']);
  }
}
