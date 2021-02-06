import { AfterViewInit, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { EnseignantService } from '../../gestion-enseignant/services/enseignant.service';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-modif',
  templateUrl: './session-modif.component.html',
  styleUrls: ['./session-modif.component.css'],
})
export class SessionModifComponent implements OnInit {
  id: number;
  session: Session;
  enseignants: any[];
  @ViewChild('form') form: NgForm;
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    public modalRef: MDBModalRef,
    private readonly enseignantService: EnseignantService
  ) {}
  data: any;

  ngOnInit(): void {
    this.enseignantService.getEnseignants().subscribe((data) => {
      this.enseignants = data;
    });
    this.session = this.data;
    setTimeout(() => {
      this.form.setValue({
        president: this.session.president._id,
        filiere: this.session.filiere,
        date: this.session.date,
        numero :this.session.numero
      });
    }, 100);
  }

  onSubmit(form: NgForm) {
    const president = this.enseignants.find(item=>item._id===form.value.president)
    const body = {...form.value , president}
    this.sessionService.UpdateSession(body, this.id.toString());
    this.modalRef.hide();
    this.router.navigate(['/Administrateur/session']);
  }

  onClear() {
    this.form.reset();
    this.router.navigate(['/Administrateur/session']);
    
  }
}
