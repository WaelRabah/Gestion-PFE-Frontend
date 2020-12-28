import { GestionSuggestionComponent } from './gestion-suggestion/gestion-suggestion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationGuard } from '../guards/administration.guard';
import { AdministrationComponent } from './administration.component';
import { GestionEnseignantComponent } from './gestion-enseignant/gestion-enseignant.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { SessionComponent } from './session/session.component';
import { SessionCreateComponent} from './session/session-create/session-create.component';
import { SessionModifComponent} from './session/session-modif/session-modif.component';
import { GestionSoutenanceComponent } from './session/gestion-soutenance/gestion-soutenance.component';
import { AjouterSoutenanceComponent } from './session/gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';
import { ModifySoutenanceComponent } from './session/gestion-soutenance/modify-soutenance/modify-soutenance.component';
import { GestionPfeComponent } from './gestion-pfe/gestion-pfe.component';

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
    {
      path: 'gestion-pfe',
      canActivate: [AdministrationGuard],
      component: GestionPfeComponent
    },
    {
      path: 'gestion-suggestion',
      component: GestionSuggestionComponent
    },
    {
      path: 'session',
      component: SessionComponent, children:[
        { path:"modif/:id" , component:SessionModifComponent },
        { path:"create" , component:SessionCreateComponent },
        { path:"soutenances/:sessionId" , component:GestionSoutenanceComponent },
        { path:"soutenances/:sessionId/add" , component: AjouterSoutenanceComponent},
        { path:"soutenances/:sessionId/modify/:soutenanceId" , component: ModifySoutenanceComponent},
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
