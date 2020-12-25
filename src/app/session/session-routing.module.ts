import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';
import { SessionCreateComponent} from './session-create/session-create.component';
import { SessionModifComponent} from './session-modif/session-modif.component';

const routes: Routes = [
  {
    path: '',
    component: SessionComponent, children:[
      { path:"modif/:id" , component:SessionModifComponent },
      { path:"create" , component:SessionCreateComponent }
    ]
  }]

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SessionRoutingModule { }

