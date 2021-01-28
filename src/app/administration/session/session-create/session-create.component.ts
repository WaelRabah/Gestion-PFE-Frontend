import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { EnseignantService } from '../../gestion-enseignant/services/enseignant.service';

import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css'],
})
export class SessionCreateComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  enseignants: any[];
  constructor(
    private sessionService: SessionService,
    private route: Router,
    public modalRef: MDBModalRef,
    private readonly enseignantService: EnseignantService
  ) {}

  ngOnInit(): void {
    this.enseignantService.getEnseignants().subscribe((data) => {
      console.log(data)
      this.enseignants = data;
    });
  }

  onSubmit(form: NgForm) {
    const {presidentId} =form.value
    const president =this.enseignants.find(item=>item._id===presidentId)
    const body= {...form.value , president}
    delete body.presidentId
    
    this.sessionService.storeSession(body).subscribe((data: Session) => {
      this.form.reset();
      data.date = data.date.slice(0, 10);
      this.sessionService.addSession(data);
      this.modalRef.hide();
    });
  }

  onClear() {
    this.form.reset();
    this.route.navigate(['/Administrateur/session']);
  }
}
