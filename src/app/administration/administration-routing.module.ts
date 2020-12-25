import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationGuard } from '../guards/administration.guard';

import { AdministrationComponent } from './administration.component';
import { GestionEnseignantComponent } from './gestion-enseignant/gestion-enseignant.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent },
    {
      path: 'gestion-etudiant',
      canActivate: [AdministrationGuard],
      component: GestionEtudiantComponent
    },
    {
      path: 'gestion-enseignant',
      canActivate: [AdministrationGuard],
      component: GestionEnseignantComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
