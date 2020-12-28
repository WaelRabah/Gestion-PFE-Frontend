import { SuggererSujetComponent } from './suggerer-sujet/suggerer-sujet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnseignantComponent } from './enseignant.component';

const routes: Routes = [
  {
    path: '',
    component: EnseignantComponent
  },
  {
    path: 'suggerer',
    component: SuggererSujetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
