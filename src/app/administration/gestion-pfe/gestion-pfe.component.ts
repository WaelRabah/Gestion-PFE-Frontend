import { RefuserPfeComponent } from './refuser-pfe/refuser-pfe.component';
import { AccepterPfeComponent } from './accepter-pfe/accepter-pfe.component';
import { PfeService } from './services/pfe.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-pfe',
  templateUrl: './gestion-pfe.component.html',
  styleUrls: ['./gestion-pfe.component.css']
})
export class GestionPfeComponent implements OnInit {
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
  constructor(private pfeService:PfeService,private modalService: MDBModalService) {}
  modalRef: MDBModalRef;
  changeFilter(event) {
    this.filter_key = event.target.value;
    if(this.filter_key)
    this.reset()
  }

  openAccepterModal(data) {
    this.modalRef = this.modalService.show(AccepterPfeComponent, {
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
    this.modalRef.content.action.subscribe( (result: any) => { if(result) this.refresh.next(true); });
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<{} | null> = new Subject<{} | null>();


  openRefuserModal(data) {
    this.modalRef = this.modalService.show(RefuserPfeComponent, {
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
    this.modalRef.content.action.subscribe( (result: any) => {
      if(result) this.refresh.next(true);

     });
  }
  ngOnInit(): void {
  }
  onKey(e) {
    if (e.key === 'Enter') this.searchItems();
  }
  searchItems() {
    if (
      this.sujet === '' &&
      this.entreprise === ''
 
    )
      return;

    this.search.next({
      sujet: this.sujet,
      entreprise: this.entreprise,

    });
  }
  reset() {
    this.sujet = '';
    this.entreprise = '';

    this.search.next({
      sujet: this.sujet,
      entreprise: this.entreprise,

    });
  }
}
