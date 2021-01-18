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
  styleUrls: ['./gestion-etudiant.component.css']
})
export class GestionEtudiantComponent implements OnInit {

  constructor(private etudiantService:EtudiantService,private modalService: MDBModalService) {}
  modalRef: MDBModalRef;


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
        data: {data:data}
    });
    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<string | null> = new Subject<string | null>();
  searchText:string
  @HostListener('input') oninput() {
    this.search.next(this.searchText)
  }

  openAddModal() {
    this.modalRef = this.modalService.show(AjouteComponent, {
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
  ngOnInit(): void {
  }
  searchItems(){
    if(this.searchText=="") this.searchText=null;
    this.search.next(this.searchText);
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
