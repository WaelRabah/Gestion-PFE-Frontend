import { GestionSuggestionService } from './../gestion-suggestion.service';
import { SuggestionPFE } from './../models/suggestion-pfe.model';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Status } from '../enums/status.enum';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-afficher-suggestions',
  templateUrl: './afficher-suggestions.component.html',
  styleUrls: ['./afficher-suggestions.component.css']
})
export class AfficherSuggestionsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: SuggestionPFE[] = [];
  allStudents: SuggestionPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', 'Fiche de renseignement','Action'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private suggestionService :GestionSuggestionService,
    private cdRef: ChangeDetectorRef,
    private modalService:NgbModal
    ){}

  refresh(){
    this.suggestionService.getSuggestionsByStatus(Status.Attente).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allStudents=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() accepterSuggestion = new EventEmitter<SuggestionPFE>();

  openAccepterModal(suggestionPfe:SuggestionPFE){
    this.accepterSuggestion.emit(suggestionPfe);
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
    return this.suggestionService.getPDF(id).subscribe(
      (response) => {

        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=response;

      }
    )
  }

  @Output() refuserSuggestion = new EventEmitter<SuggestionPFE>();

  openRefuserModal(sujetPfe: SuggestionPFE) {
    this.refuserSuggestion.emit(sujetPfe);
  }
}
