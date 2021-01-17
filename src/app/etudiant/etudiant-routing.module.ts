import { UploadRapportPfeComponent } from './upload-rapport-pfe/upload-rapport-pfe.component';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';
import { AncienPfeComponent } from './ancien-pfe/ancien-pfe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtudiantComponent } from './etudiant.component';


const routes: Routes = [
  {
    path: '',
    component: EtudiantComponent
  },
  {
    path: 'ancien-pfe',
    component: AncienPfeComponent
  },
  {
    path: 'ajouter',
    component: AjoutSujetComponent
  },
  {
    path: 'upload',
    component: UploadRapportPfeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
