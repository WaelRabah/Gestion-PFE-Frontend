import { FormsModule } from '@angular/forms';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncienPfeComponent } from './ancien-pfe/ancien-pfe.component';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';
import { UploadRapportPfeComponent } from './upload-rapport-pfe/upload-rapport-pfe.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';




@NgModule({
  declarations: [AncienPfeComponent, AjoutSujetComponent, UploadRapportPfeComponent],
  imports: [
    CommonModule,
    FormsModule,
    EtudiantRoutingModule,
    PdfJsViewerModule
  ]
})
export class EtudiantModule { }
