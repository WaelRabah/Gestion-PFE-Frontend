import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { SessionRoutingModule} from './session-routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [SessionComponent],
  imports: [
    SessionRoutingModule,
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule
  ],
})
export class SessionModule { }
