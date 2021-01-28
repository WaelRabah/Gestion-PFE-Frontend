import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { Subject } from 'rxjs';
import { SuggestionPFE } from 'src/app/enseignant/models/suggestion-pfe.model';
import { SuggestionsService } from './suggestions.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: SuggestionPFE[] = [];
  allSuggestions: SuggestionPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', 'Fiche de renseignement','contact'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private suggestionService :SuggestionsService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthentificationService,
    private modalService:NgbModal
    ){}

  refresh(){
    this.suggestionService.getSuggestions().subscribe(
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
    return this.suggestionService.getPDF(id).subscribe(
      (response) => {
        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=response;

      }
    )
  }
}
