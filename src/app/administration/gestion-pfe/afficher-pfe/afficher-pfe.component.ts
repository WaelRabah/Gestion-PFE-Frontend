import { PfeService } from './../services/pfe.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import {SujetPFE} from '../models/pfe.model';
import { Status } from '../enums/status.enum';
@Component({
  selector: 'app-afficher-pfe',
  templateUrl: './afficher-pfe.component.html',
  styleUrls: ['./afficher-pfe.component.css']
})
export class AfficherPfeComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: SujetPFE[] = [];
  allStudents: SujetPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', 'Dossier','Action'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(private pfeService:PfeService,private cdRef: ChangeDetectorRef){}

  refresh(){
    this.pfeService.getPfesByStatus(Status.Attente).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allStudents=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() editSujet = new EventEmitter<SujetPFE>();

  openAccepterModal(sujetPfe:SujetPFE){
    this.editSujet.emit(sujetPfe);
  }
  @Input() refreshTable: Subject<boolean> = new Subject<boolean>();
  @Input() search: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.refreshTable.subscribe(response => {
      if(response){
       this.refresh();
      // Or do whatever operations you need.
    }
   });
   this.search.subscribe(response => {
      this.searchText=response;
      this.mdbTablePagination.searchText = response;
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

    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.allStudents);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  getPDF(id: string) {
    console.log(id);
    return this.pfeService.getPDF(id).subscribe(
      (response) => {

        var file = new Blob([response], {type: 'application/pdf'});
        var fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);

      }
    )
  }

  @Output() refuserSujet = new EventEmitter<SujetPFE>();

  openRefuserModal(sujetPfe: SujetPFE) {
    this.refuserSujet.emit(sujetPfe);
  }
}
