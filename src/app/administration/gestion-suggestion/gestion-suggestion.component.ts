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
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
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
  search: Subject<{} | null> = new Subject<{} | null>();


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
  changeFilter(event) {
    this.filter_key = event.target.value;

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
