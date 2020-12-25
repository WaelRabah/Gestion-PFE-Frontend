import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { AjouteComponent } from './gestion-etudiant/ajoute/ajoute.component';
import { AfficheComponent } from './gestion-etudiant/affiche/affiche.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SessionCreateComponent } from './session/session-create/session-create.component';
import { SessionComponent } from './session/session.component';
import { SessionModifComponent} from './session/session-modif/session-modif.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdministrationComponent,
    SessionComponent,
     GestionEtudiantComponent,
      AjouteComponent,
      AfficheComponent,
      SessionModifComponent,
      SessionCreateComponent
    ],
  imports: [
    FilterPipeModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrationRoutingModule,
    RouterModule,
  ]
})
export class AdministrationModule { }
