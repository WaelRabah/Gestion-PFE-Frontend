import { UploadRapportPfeComponent } from './upload-rapport-pfe/upload-rapport-pfe.component';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtudiantComponent } from './etudiant.component';


const routes: Routes = [

  {
    path: 'ajouter',
    component: AjoutSujetComponent
  },
  {
    path: 'upload',
    component: UploadRapportPfeComponent
  },
  {
    path: '**',
    component: UploadRapportPfeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
