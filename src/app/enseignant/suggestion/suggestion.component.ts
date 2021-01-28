import { EnseignantService } from './../../administration/gestion-enseignant/services/enseignant.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  constructor() {}
  modalRef: MDBModalRef;



  search: Subject<{} | null> = new Subject<{} | null>();
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
  changeFilter(event) {
    this.filter_key = event.target.value;

  }


  ngOnInit(): void {
  }
  onKey(e){
    
    if (e.key==='Enter')
      this.searchItems()
    
  }
  searchItems() {
    if (this.sujet==='' && this.entreprise==='') return

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
