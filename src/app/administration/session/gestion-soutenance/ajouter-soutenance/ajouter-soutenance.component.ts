import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { EnseignantService } from 'src/app/administration/gestion-enseignant/services/enseignant.service';
import { Session } from '../../session.model';
import { SessionService } from '../../session.service';
import { SoutenanceService } from '../services/soutenance.service';

@Component({
  selector: 'app-ajouter-soutenance',
  templateUrl: './ajouter-soutenance.component.html',
  styleUrls: ['./ajouter-soutenance.component.css'],
})
export class AjouterSoutenanceComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  sessionId: string;
  selectedSession: Session;
  enseignants: any[];
  pfes: any[];
  heures: any[] = ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00'];
  add: string;
  constructor(
    private route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly enseignantService: EnseignantService,
    private readonly soutenanceService: SoutenanceService,
    private router: Router,
    public modalRef: MDBModalRef
  ) {}

  ngOnInit(): void {
    this.enseignantService.getEnseignants().subscribe((data) => {
      this.enseignants = data;
    });
    this.soutenanceService.getUnassignedPfes().subscribe((data) => {
      this.pfes = data;
    });
    this.sessionService.fetchSessionById(this.sessionId).subscribe((data) => {
      this.selectedSession = data;
    });
  }

  onSubmit(form: NgForm) {
    const pfe = this.pfes.find((item) => item._id === form.value.pfe);

    const body = {
      encadrantId: form.value.encadrant,
      heure: form.value.Heure,
      presidentId: this.selectedSession.presidentId,
      rapporteurId: form.value.rapporteur,
      isItPublic: form.value.public !== '',
      studentId: pfe.studentId,
      sessionId: this.sessionId,
      pfeId: pfe._id,
    };
    this.soutenanceService.addSoutenanceToSession(body).subscribe((data) => {});
    this.form.reset();
    this.modalRef.hide();
  }

  onClear() {
    this.form.reset();
    this.modalRef.hide();
  }
}
