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
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
  changeFilter(event) {
    this.filter_key = event.target.value;

  }
  headElements = ['Sujet', 'Entreprise', 'Description', 'Fiche de renseignement','contact'];
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private suggestionService :SuggestionsService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthentificationService,
    private modalService:NgbModal
    ){}
loading=false;
  refresh(){
    this.loading=true;
    this.suggestionService.getSuggestions().subscribe(
      (suggestions)=>{this.elements=suggestions;this.mdbTable.setDataSource(this.elements);
        this.loading=false;
        this.elements = this.mdbTable.getDataSource();
        this.allSuggestions=suggestions;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  onKey(e){
    
    if (e.key==='Enter')
      this.searchItems()
    
  }
  ngOnInit() {

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
    if (this.sujet === '' && this.entreprise === '') {
      this.mdbTable.setDataSource(this.allSuggestions);
      this.elements = this.allSuggestions;
      return;
    }

    this.elements = this.allSuggestions.filter((item) => {
      const { titre,entreprise } = item;
      
      return (
        (this.sujet ? titre.includes(this.sujet) : true) &&
        (this.entreprise ? entreprise.includes(this.entreprise) : true)
    
      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }
  reset() {
    this.sujet = '';
    this.entreprise = '';
    this.searchItems()
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
