import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Session } from '../session.model';
import { SessionService } from '../session.service';
import { AjouterSoutenanceComponent } from './ajouter-soutenance/ajouter-soutenance.component';
import { ModifySoutenanceComponent } from './modify-soutenance/modify-soutenance.component';

@Component({
  selector: 'app-gestion-soutenance',
  templateUrl: './gestion-soutenance.component.html',
  styleUrls: ['./gestion-soutenance.component.css'],
})
export class GestionSoutenanceComponent implements OnInit {
  sessionId: string;
  selectedSession: Session;
  searchTerm: string = '';
  isItPublic: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private router: Router,
    private modalService: MDBModalService
  ) {
    route.params.subscribe((params) => {
      this.sessionId = params.sessionId;
      this.sessionService.fetchSessionById(this.sessionId).subscribe((data) => {
        this.selectedSession = data;
      });
    });
  }
  modalRef: MDBModalRef;
  openAddSoutenanceModal() {
    this.modalRef = this.modalService.show(AjouterSoutenanceComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal',
      containerClass: 'largeModal',
      animated: true,
      data: {
        sessionId: this.sessionId,
      },
    });
  }

  ngOnInit(): void {
    this.searchTerm = '';
  }
}
