import { AuthentificationService } from './../../../services/authentification.service';
import { SuggestionService } from './../suggestion.service';
import { SuggestionPFE } from './../../models/suggestion-pfe.model';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Status } from '../../enums/status.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

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
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private enseignantSuggestionService :SuggestionService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthentificationService,
    private modalService:NgbModal
    ){}

  refresh(){
    console.log(this.authService.getUserId());
    this.enseignantSuggestionService.getSuggestionsByEnseignantId(this.authService.getUserId()).subscribe(
      (suggestions)=>{this.elements=suggestions;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allSuggestions=suggestions;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }

  @Input() search: Subject<string> = new Subject<string>();

  ngOnInit() {
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
      this.mdbTable.setDataSource(this.allSuggestions);
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
    return this.enseignantSuggestionService.getPDF(id).subscribe(
      (response) => {

        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=response;

      }
    )
  }


}
