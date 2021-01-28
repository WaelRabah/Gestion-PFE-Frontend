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
  search: Subject<{} | null> = new Subject<{} | null>();
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
  changeFilter(event) {
    this.filter_key = event.target.value;

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
