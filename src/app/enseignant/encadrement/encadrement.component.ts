import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-encadrement',
  templateUrl: './encadrement.component.html',
  styleUrls: ['./encadrement.component.css']
})
export class EncadrementComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }
  refresh: Subject<boolean> = new Subject<boolean>();
  search: Subject<string | null> = new Subject<string | null>();
  searchText:string
  @HostListener('input') oninput() {
    this.search.next(this.searchText)
  }
  searchItems(){
    if(this.searchText=="") this.searchText=null;
    this.search.next(this.searchText);
  }
}
