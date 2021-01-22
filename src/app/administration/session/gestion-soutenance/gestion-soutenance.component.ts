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
  pdfLoading = false;
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

  onDownload(){
    this.pdfLoading = true;
    this.sessionService.downloadPDF(this.sessionId).subscribe( (data:any) => {
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = `http://localhost:3000/uploads/sessions/${data.filename}`;
      a.target ="_blank"
      setTimeout ( () => {
        a.click();
        this.pdfLoading = false;
      },2000);
    });
  }
}
