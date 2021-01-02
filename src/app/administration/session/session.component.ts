import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './session.model';
import { SessionService } from './session.service';
import Swal from 'sweetalert2';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AjouterSoutenanceComponent } from './gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';
import { Subject } from 'rxjs';
import { ModifySoutenanceComponent } from './gestion-soutenance/modify-soutenance/modify-soutenance.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  elements: Session[] = [];
  selectedSession: Session;
  headElements = ['#', 'Filiere', 'Date', 'Actions'];
  searchText: any = {}
  refresh: Subject<boolean> = new Subject<boolean>();
  constructor(private sessionService: SessionService, private route: Router) { }

  ngOnInit(): void {
    this.sessionService.fetchSessions().subscribe(data => {
      data.map(session => {
        session.date = session.date.slice(0, 10);
      })
      this.sessionService.setSession(data);
      this.elements = this.sessionService.getSessions();
      console.log(this.elements)
    });

    this.sessionService.sessionChanged.subscribe(data => {
      this.elements = this.sessionService.getSessions();
    })

  }

  onClickSession(index: string) {

    this.selectedSession = this.elements.find(element => element._id == index)

    this.route.navigate(['/Administrateur/session/soutenances/' + this.selectedSession._id])
  }

  onNavigateCreate() {
    this.route.navigate(["/Administrateur/session/create"]);
    console.log("hello")
  }

  onNavigateModif(index: string) {
    this.onClickSession(index);
    let element = this.elements.find(element => element._id == index);
    this.route.navigate(['/Administrateur/session/modif', element._id])
  }
  onDelete(index: string) {
    Swal.fire({
      title: 'Tu es sure?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprime la session!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.deleteSession(index);
        this.route.navigate(["/Administrateur/session"])
        Swal.fire(
          'Supprimée!',
          'La session est supprimé',
          'success'
        )
      }
    })
  }

}
