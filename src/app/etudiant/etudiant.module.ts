import { FormsModule } from '@angular/forms';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';
import { UploadRapportPfeComponent } from './upload-rapport-pfe/upload-rapport-pfe.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';




@NgModule({
  declarations: [AjoutSujetComponent, UploadRapportPfeComponent, SuggestionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    EtudiantRoutingModule,
    MDBBootstrapModule,
    PdfJsViewerModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EtudiantModule { }
