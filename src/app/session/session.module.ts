import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { SessionRoutingModule} from './session-routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SessionModifComponent } from './session-modif/session-modif.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SessionComponent, SessionModifComponent, SessionCreateComponent],
  imports: [
    SessionRoutingModule,
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    RouterModule
  ],
})
export class SessionModule { }
