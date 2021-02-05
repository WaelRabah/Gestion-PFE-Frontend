import { AuthentificationService } from './../../../services/authentification.service';
import { SuggestionService } from './../suggestion.service';
import { SuggestionPFE } from './../../models/suggestion-pfe.model';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Status } from '../../enums/status.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
interface SearchObj {
  sujet: string;
  entreprise: string;
}
@Component({
  selector: 'app-afficher-suggestion',
  templateUrl: './afficher-suggestion.component.html',
  styleUrls: ['./afficher-suggestion.component.css']
})
export class AfficherSuggestionComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: SuggestionPFE[] = [];
  allSuggestions: SuggestionPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', 'Fiche de renseignement','Statut'];
  searchObj: SearchObj = {
    sujet: '',
    entreprise: ''
  };
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private enseignantSuggestionService :SuggestionService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthentificationService,
    private modalService:NgbModal
    ){}
    loading=false;
  refresh(){
    this.loading=true;
    this.enseignantSuggestionService.getSuggestionsByEnseignantId(this.authService.getUserId()).subscribe(
      (suggestions)=>{this.elements=suggestions;this.mdbTable.setDataSource(this.elements); console.log(suggestions);
      this.loading=false;
        this.elements = this.mdbTable.getDataSource();
        this.allSuggestions=suggestions;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }

  @Input() search: Subject<SearchObj> = new Subject<SearchObj>();

  ngOnInit() {
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
    const { sujet , entreprise } = this.searchObj;
    const searchSujet = sujet;
    const searchEntreprise = entreprise;
    const prev = this.mdbTable.getDataSource();
    if (sujet === '' && entreprise === '') {
      this.mdbTable.setDataSource(this.allSuggestions);
      this.elements = this.allSuggestions;
      return;
    }

    this.elements = this.allSuggestions.filter((item) => {
      const { titre , entreprise } = item;

      return (
        (searchSujet ? titre.includes(searchSujet) : true) &&
        (searchEntreprise !== 'default' ? entreprise.includes(searchEntreprise) : true)
      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }

  getPDF(id: string) {
    return this.enseignantSuggestionService.getPDF(id).subscribe(
      (response) => {

        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=response;

      }
    )
  }


}
