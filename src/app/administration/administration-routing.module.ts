import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationGuard } from '../guards/administration.guard';

import { AdministrationComponent } from './administration.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent },
    {
      path: 'gestion-etudiant',
      /*canActivate: [AdministrationGuard],*/
      component: GestionEtudiantComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
