import { AjouteEtudCsvComponent } from './ajoute-etud-csv/ajoute-etud-csv.component';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { AjouteComponent } from './ajoute/ajoute.component';
import { EditComponent } from './edit/edit.component';
import { EtudiantService } from './services/etudiant.service';

@Component({
  selector: 'gestion-etudiant',
  templateUrl: './gestion-etudiant.component.html',
  styleUrls: ['./gestion-etudiant.component.css'],
})
export class GestionEtudiantComponent implements OnInit {
  filter_key: string = 'default';
  nom: string = '';
  prenom: string = '';
  filiere: string = 'default';
  
  email: string = '';
  constructor(
    private etudiantService: EtudiantService,
    private modalService: MDBModalService
  ) {}
  modalRef: MDBModalRef;


  changeFilter(event) {
    this.filter_key = event.target.value;
    if(this.filter_key)
    this.reset()
  }
  openEditModal(data) {
    this.modalRef = this.modalService.show(EditComponent, {
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
      console.log(result);
    });
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<{} | null> = new Subject<{} | null>();
 

  openAddModal() {
    this.modalRef = this.modalService.show(AjouteComponent, {
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
  onKey(e){
    
    if (e.key==='Enter')
      this.searchItems()
    
  }
  searchItems() {
    if (this.nom==='' && this.prenom==='' && this.email==='' && this.filiere==='default') return

    this.search.next({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      filiere: this.filiere,
    });
  }
  reset() {
    this.nom = '';
    this.prenom = '';
    this.filiere = 'default';
    this.email = '';
    this.search.next({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      filiere: this.filiere,
    });
  }
  openAddCsv(){
    this.modalRef = this.modalService.show(AjouteEtudCsvComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog cascading-modal',
      containerClass: 'largeModal',
      animated: true
  });
  this.modalRef.content.action.subscribe( (result: any) => {
    if(result) this.refresh.next(true);

   });
  }
}
