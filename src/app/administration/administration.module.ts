import { GestionEnseignantComponent } from './gestion-enseignant/gestion-enseignant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { AjouteComponent } from './gestion-etudiant/ajoute/ajoute.component';
import { AfficheComponent } from './gestion-etudiant/affiche/affiche.component';
import { SessionCreateComponent } from './session/session-create/session-create.component';
import { SessionComponent } from './session/session.component';
import { SessionModifComponent} from './session/session-modif/session-modif.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { EditComponent } from './gestion-etudiant/edit/edit.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSelectModule} from '@angular/material/select';
import { EditEnsComponent } from './gestion-enseignant/edit/edit.component';
import { AjouteEnsComponent } from './gestion-enseignant/ajoute/ajoute.component';
import { AfficheEnsComponent } from './gestion-enseignant/affiche/affiche.component';
import { GestionSoutenanceComponent } from './session/gestion-soutenance/gestion-soutenance.component';
import { ListeComponent } from './session/gestion-soutenance/liste/liste.component';
import { DetailComponent } from './session/gestion-soutenance/detail/detail.component';
import { AjouterSoutenanceComponent } from './session/gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';
import { ModifySoutenanceComponent } from './session/gestion-soutenance/modify-soutenance/modify-soutenance.component';
import { GestionPfeComponent } from './gestion-pfe/gestion-pfe.component';
import { AfficherPfeComponent} from './gestion-pfe/afficher-pfe/afficher-pfe.component';
import { RefuserPfeComponent} from './gestion-pfe/refuser-pfe/refuser-pfe.component';
import { AccepterPfeComponent} from './gestion-pfe/accepter-pfe/accepter-pfe.component';

@NgModule({
  declarations: [AdministrationComponent,
    SessionComponent,
    AdministrationComponent,
     GestionEtudiantComponent,
    AjouteComponent,
    AfficheComponent,
    EditComponent,
    EditEnsComponent,
    AfficheEnsComponent,
    AjouteEnsComponent,
    SessionModifComponent,
    SessionCreateComponent,
    GestionEnseignantComponent,
    SessionModifComponent,
    SessionCreateComponent,
    GestionSoutenanceComponent,
    ListeComponent,
    DetailComponent,
    AjouterSoutenanceComponent,
    ModifySoutenanceComponent,
    GestionPfeComponent,
    AccepterPfeComponent,
    AfficherPfeComponent,
    RefuserPfeComponent
    ],
  imports: [
    FilterPipeModule,
    MDBBootstrapModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrationRoutingModule
    ],
  entryComponents: [ EditComponent,AjouteComponent, EditEnsComponent, AjouteEnsComponent]
})
export class AdministrationModule { }
