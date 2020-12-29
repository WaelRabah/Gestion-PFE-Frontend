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



  search: Subject<string | null> = new Subject<string | null>();
  searchText:string
  @HostListener('input') oninput() {
    this.search.next(this.searchText)
  }


  ngOnInit(): void {
  }
  searchItems(){
    if(this.searchText=="") this.searchText=null;
    this.search.next(this.searchText);
  }
}
