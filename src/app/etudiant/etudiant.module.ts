import { FormsModule } from '@angular/forms';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncienPfeComponent } from './ancien-pfe/ancien-pfe.component';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';




@NgModule({
  declarations: [AncienPfeComponent, AjoutSujetComponent],
  imports: [
    CommonModule,
    FormsModule,
    EtudiantRoutingModule
  ]
})
export class EtudiantModule { }
