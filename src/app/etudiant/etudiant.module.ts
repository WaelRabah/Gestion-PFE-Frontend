import { EtudiantRoutingModule } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AncienPfeComponent } from './ancien-pfe/ancien-pfe.component';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';



@NgModule({
  declarations: [AncienPfeComponent, AjoutSujetComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule
  ]
})
export class EtudiantModule { }
