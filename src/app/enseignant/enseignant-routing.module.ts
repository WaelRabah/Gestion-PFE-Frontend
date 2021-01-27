import { EncadrementComponent } from './encadrement/encadrement.component';
import { SuggererSujetComponent } from './suggestion/suggerer-sujet/suggerer-sujet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnseignantComponent } from './enseignant.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

const routes: Routes = [

  {
    path: 'suggerer',
    component: SuggererSujetComponent
  },
  {
    path: 'mes-suggestions',
    component: SuggestionComponent
  },
  {
    path: 'encadrements',
    component: EncadrementComponent
  },
  {
    path: '**',
    component: SuggestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
