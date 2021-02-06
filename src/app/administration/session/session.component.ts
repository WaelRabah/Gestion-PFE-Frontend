import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from './session.model';
import { SessionService } from './session.service';
import Swal from 'sweetalert2';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AjouterSoutenanceComponent } from './gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';
import { Subject } from 'rxjs';
import { ModifySoutenanceComponent } from './gestion-soutenance/modify-soutenance/modify-soutenance.component';
import { SessionModifComponent } from './session-modif/session-modif.component';
import { SessionCreateComponent } from './session-create/session-create.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  filter_key: string = 'default';
  filiere: string = 'default';
  date: string = '';
  changeFilter(event) {
    this.filter_key = event.target.value;
  }
  elements: Session[] = [];
  allSessions: Session[] = [];
  selectedSession: Session;
  headElements = ['Filiere', 'Date', 'Actions'];
  searchText: any = {};
  refresh: Subject<boolean> = new Subject<boolean>();
  constructor(private sessionService: SessionService , activated : ActivatedRoute, private route: Router, private modalService: MDBModalService) {
  }
loading=false;
fetchSessions(){
  this.loading=true;
  this.sessionService.fetchSessions().subscribe(data => {
    this.loading=false;
    data.map(session => {

      session.date = session.date.slice(0, 10);
    });
    this.elements = data;
    this.allSessions = data;
    this.onClickSession(this.elements[0]._id);
  });
}
  ngOnInit(): void {
      this.fetchSessions()

      this.modalService.closed.subscribe(()=>   this.fetchSessions())
  }

 onClickSession(index: string) {
    this.sessionService
      .fetchSessionById(
        this.elements.find((element) => element._id == index)._id
      )
      .subscribe((data) => {
        this.selectedSession = data;
        this.route.navigate([
          '/Administrateur/session/soutenances/' + this.selectedSession._id,
        ]);
      });
  }

  modalRef: MDBModalRef;

  openAddModal() {
    this.modalRef = this.modalService.show(SessionCreateComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal',
      containerClass: 'largeModal',
      animated: true,
    });
    this.modalRef.content.action.subscribe((result: any) => {

      if (result) this.refresh.next(true);
    });

  }

  openEditModal(data) {
    this.modalRef = this.modalService.show(SessionModifComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal',
      containerClass: 'largeModal',
      animated: true,
      data: { data: data , id : data._id },
    });

    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
  })

  }

  onDelete(index: string) {
    Swal.fire({
      title: 'Archiver la session',
      text: 'Tu es sur ?!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, archiver la session!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.archiveSession(index).subscribe((response) => {this.fetchSessions()});
        this.route.navigate(['/Administrateur/session']);
        Swal.fire('Archivée!', 'La session est archivée', 'success');

      }
    });

  }
  searchItems() {
    this.searchText = {
      date: this.date,
      filiere: this.filiere,
    };

    this.elements = this.allSessions.filter((item) => {
      const { date , filiere } = item;

      return (
        (this.date ? date===this.date : true) &&
        (this.filiere!=='default'  ? filiere.includes(this.filiere) : true)
      );
    });

  }
  reset() {
    this.date = '';
    this.filiere = 'default';
    this.searchText = {
      date: this.date,
      filiere: this.filiere,
    };
    this.elements=this.allSessions

  }
}
