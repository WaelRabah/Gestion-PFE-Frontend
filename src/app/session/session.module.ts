import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { SessionRoutingModule} from './session-routing.module';



@NgModule({
  declarations: [SessionComponent],
  imports: [
    SessionRoutingModule,
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SessionModule { }
