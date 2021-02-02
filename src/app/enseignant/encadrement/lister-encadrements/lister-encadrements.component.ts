import { EnseignantService } from './../../enseignant.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

interface SearchObj {
  sujet: string;
  entreprise: string;
}
@Component({
  selector: 'app-lister-encadrements',
  templateUrl: './lister-encadrements.component.html',
  styleUrls: ['./lister-encadrements.component.css']
})
export class ListerEncadrementsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements = [];
  allEncadrements = [];

  headElements = ['Sujet', 'Description', 'Entreprise', 'Etudiant'];
  searchObj: SearchObj = {
    sujet: '',
    entreprise: ''
  };
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private cdRef: ChangeDetectorRef,
    private enseignantService: EnseignantService
  ) { }

    loading=false;
  refresh() {
    this.loading=true;
    this.enseignantService.getEncadrement().subscribe(
      (encadrements) => {
        this.loading=false;
        this.elements = encadrements; this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allEncadrements = encadrements;
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => console.log(error)
    )
  }

  @Input() refreshTable: Subject<boolean> = new Subject<boolean>();
  @Input() search: Subject<SearchObj> = new Subject<SearchObj>();

  ngOnInit() {
    this.refreshTable.subscribe(response => {
      if (response) {
        this.refresh();
        // Or do whatever operations you need.
      }
    });
    this.search.subscribe(response => {
      this.searchObj = response;
      
      this.searchItems();
      // Or do whatever operations you need.

    });
    this.refresh();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  searchItems() {
    const { sujet , entreprise } = this.searchObj;
    const searchSujet = sujet;
    const searchEntreprise = entreprise;
    const prev = this.mdbTable.getDataSource();
    if (sujet === '' && entreprise === '') {
      this.mdbTable.setDataSource(this.allEncadrements);
      this.elements = this.allEncadrements;
      return;
    }

    this.elements = this.allEncadrements.filter((item) => {
      const { titre , entreprise } = item;
      console.log(item)
      return (
        (searchSujet ? titre.includes(searchSujet) : true) &&
        (searchEntreprise !== 'default' ? entreprise.includes(searchEntreprise) : true)
      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }

}
