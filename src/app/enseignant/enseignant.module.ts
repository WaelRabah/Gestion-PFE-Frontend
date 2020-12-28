import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantRoutingModule } from './enseignant-routing.module';
import { EnseignantComponent } from './enseignant.component';


@NgModule({
  declarations: [EnseignantComponent],
  imports: [
    CommonModule,
    FormsModule,
    EnseignantRoutingModule
  ]
})
export class EnseignantModule { }
