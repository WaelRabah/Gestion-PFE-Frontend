import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Session } from '../../session.model';
import { Soutenance } from '../models/soutenance.model';
import { ModifySoutenanceComponent } from '../modify-soutenance/modify-soutenance.component';
import { SoutenanceService } from '../services/soutenance.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() index: number;
  @Input() selectedSoutenance: number;
  @Input() selectedSession: Session;
  @Input() item: any;
  @Input() original: any;
  @Input() sessionId: string;
  displayable : any
  refresh: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private service: SoutenanceService,
    private modalService: MDBModalService
  ) {
   
  }
  modalRef: MDBModalRef;
  openEditSoutenanceModal() {
    this.modalRef = this.modalService.show(ModifySoutenanceComponent, {
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
        soutenanceId: this.original._id,
      },
    });
  }
  removeSoutenanceFromSession() {
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Archiver la soutenance',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .archiverSoutenance(this.original, this.selectedSession)
          .subscribe();
        Swal.fire('Supprimée!', 'La soutenance a été archivée', 'success');
        this.router.navigate([`/Administrateur/session`]);
      }
    });
  }
  ngOnInit(): void {

  }
}
