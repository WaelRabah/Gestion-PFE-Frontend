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

  constructor(private pfeService:PfeService,private modalService: MDBModalService) {}
  modalRef: MDBModalRef;


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
    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<string | null> = new Subject<string | null>();
  searchText:string
  @HostListener('input') oninput() {
    this.search.next(this.searchText)
  }

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
  searchItems(){
    if(this.searchText=="") this.searchText=null;
    this.search.next(this.searchText);
  }

}
