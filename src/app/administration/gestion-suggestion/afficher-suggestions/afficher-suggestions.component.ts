import { GestionSuggestionService } from './../gestion-suggestion.service';
import { SuggestionPFE } from './../models/suggestion-pfe.model';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Status } from '../enums/status.enum';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface SearchObj {
  sujet: string;
  entreprise: string;

}
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
  allSuggestions: SuggestionPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', 'Fiche de renseignement','Action'];
  searchObj: SearchObj = {
    sujet : '',
    entreprise  :''
  };
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private suggestionService :GestionSuggestionService,
    private cdRef: ChangeDetectorRef,
    private modalService:NgbModal
    ){}
    loading=false;
  refresh(){
    this.loading=true;
    this.suggestionService.getSuggestionsByStatus(Status.Attente).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.loading=false;
        this.elements = this.mdbTable.getDataSource();
        this.allSuggestions=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() accepterSuggestion = new EventEmitter<SuggestionPFE>();

  openAccepterModal(suggestionPfe:SuggestionPFE){
    this.accepterSuggestion.emit(suggestionPfe);
  }
  @Input() refreshTable: Subject<boolean> = new Subject<boolean>();
  @Input() search: Subject<SearchObj> = new Subject<SearchObj>();

  ngOnInit() {
    this.refreshTable.subscribe(response => {
      if(response){
       this.refresh();
      // Or do whatever operations you need.
    }
   });
   this.search.subscribe(response => {
    this.searchObj=response;

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
    const { sujet ,entreprise} = this.searchObj;
    const searchSujet = sujet;
    const searchEntreprise = entreprise;
    const prev = this.mdbTable.getDataSource();
    if (sujet === '' && entreprise === '' ) {
      this.mdbTable.setDataSource(this.allSuggestions);
      this.elements = this.allSuggestions;
      return;
    }

    this.elements = this.allSuggestions.filter((item) => {
      const { titre ,entreprise} = item;

      return (
        (searchSujet ? titre.includes(searchSujet) : true) &&
        (searchEntreprise ? entreprise.includes(searchEntreprise) : true)

      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
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
