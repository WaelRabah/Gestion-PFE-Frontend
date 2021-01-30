import { AjouteEnsCsvComponent } from './ajouteCsv/ajoute-ens-csv/ajoute-ens-csv.component';
import { ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';

import { EnseignantService } from './services/enseignant.service';
import { Subject } from 'rxjs';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AjouteEnsComponent } from './ajoute/ajoute.component';
import { EditEnsComponent } from './edit/edit.component';

@Component({
  selector: 'app-gestion-enseignant',
  templateUrl: './gestion-enseignant.component.html',
  styleUrls: ['./gestion-enseignant.component.css'],
})
export class GestionEnseignantComponent implements OnInit {
  filter_key: string = 'default';
  nom: string = '';
  prenom: string = '';
  grade: string = 'default';
  email: string = '';
  departement: string = 'default';
  constructor(
    private etudiantService: EnseignantService,
    private modalService: MDBModalService
  ) {}
  modalRef: MDBModalRef;
  changeFilter(event) {
    this.filter_key = event.target.value;

  }
  openEditModal(data) {
    this.modalRef = this.modalService.show(EditEnsComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal',
      containerClass: 'largeModal',
      animated: true,
      data: { data: data },
    });
    this.modalRef.content.action.subscribe((result: any) => {

    });
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<{} | null> = new Subject<{} | null>();



  openAddModal() {
    this.modalRef = this.modalService.show(AjouteEnsComponent, {
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
  ngOnInit(): void {}
  onKey(e) {
    if (e.key === 'Enter') this.searchItems();
  }
  openAddCsv(){
    this.modalRef = this.modalService.show(AjouteEnsCsvComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal  modal-lg',
      containerClass: 'largeModal',
      animated: true
  });
  this.modalRef.content.action.subscribe( (result: any) => {
    if(result) this.refresh.next(true);
   });
  }
  searchItems() {
    if (
      this.nom === '' &&
      this.prenom === '' &&
      this.email === '' &&
      this.grade === 'default' &&
      this.departement === 'default'
    )
      return;

    this.search.next({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      grade: this.grade,
     departement: this.departement,
    });
  }
  reset() {
    this.nom = '';
    this.prenom = '';
    this.grade = 'default';
    this.departement = 'default';
    this.email = '';
    this.search.next({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      grade: this.grade,
      departement: this.departement,
    });
  }
}

