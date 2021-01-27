import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SuggererSujetComponent } from './suggestion/suggerer-sujet/suggerer-sujet.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantRoutingModule } from './enseignant-routing.module';
import { EnseignantComponent } from './enseignant.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AfficherSuggestionComponent } from './suggestion/afficher-suggestion/afficher-suggestion.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { EncadrementComponent } from './encadrement/encadrement.component';
import { ListerEncadrementsComponent } from './encadrement/lister-encadrements/lister-encadrements.component';


@NgModule({
  declarations: [EnseignantComponent, SuggererSujetComponent, SuggestionComponent, AfficherSuggestionComponent, EncadrementComponent, ListerEncadrementsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    EnseignantRoutingModule,
    PdfJsViewerModule
  ]
})
export class EnseignantModule { }
