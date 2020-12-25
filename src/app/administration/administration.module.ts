import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { AjouteComponent } from './gestion-etudiant/ajoute/ajoute.component';
import { AfficheComponent } from './gestion-etudiant/affiche/affiche.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EditComponent } from './gestion-etudiant/edit/edit.component';
import { GestionEnseignantComponent } from './gestion-enseignant/gestion-enseignant.component';


@NgModule({
  declarations: [AdministrationComponent, GestionEtudiantComponent, AjouteComponent, AfficheComponent, EditComponent, GestionEnseignantComponent],
  imports: [
    MDBBootstrapModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    AdministrationRoutingModule
  ],
  entryComponents: [ EditComponent ]
})
export class AdministrationModule { }
