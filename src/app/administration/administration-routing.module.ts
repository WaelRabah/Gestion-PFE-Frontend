import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationGuard } from '../guards/administration.guard';
import { AdministrationComponent } from './administration.component';
import { GestionEtudiantComponent } from './gestion-etudiant/gestion-etudiant.component';
import { SessionComponent } from './session/session.component';
import { SessionCreateComponent} from './session/session-create/session-create.component';
import { SessionModifComponent} from './session/session-modif/session-modif.component';

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
      path: 'session',
      component: SessionComponent, children:[
        { path:"modif/:id" , component:SessionModifComponent },
        { path:"create" , component:SessionCreateComponent }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
