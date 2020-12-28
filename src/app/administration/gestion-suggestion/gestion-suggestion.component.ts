import { RefuserSuggestionComponent } from './refuser-suggestion/refuser-suggestion.component';
import { AccepterSuggestionComponent } from './accepter-suggestion/accepter-suggestion.component';
import { GestionSuggestionService } from './gestion-suggestion.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-suggestion',
  templateUrl: './gestion-suggestion.component.html',
  styleUrls: ['./gestion-suggestion.component.css']
})
export class GestionSuggestionComponent implements OnInit {

  constructor(private suggestionService:GestionSuggestionService,private modalService: MDBModalService) {}
  modalRef: MDBModalRef;


  openAccepterModal(data) {
    this.modalRef = this.modalService.show(AccepterSuggestionComponent, {
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
  search: Subject<string | null> = new Subject<string | null>();
  searchText:string
  @HostListener('input') oninput() {
    this.search.next(this.searchText)
  }

  openRefuserModal(data) {
    this.modalRef = this.modalService.show(RefuserSuggestionComponent, {
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
