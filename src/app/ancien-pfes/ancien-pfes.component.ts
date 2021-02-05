import { PfeService } from '../administration/gestion-pfe/services/pfe.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import {SujetPFE} from '../administration/gestion-pfe/models/pfe.model';
import { Status } from '../administration/gestion-pfe/enums/status.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
@Component({
  selector: 'app-ancien-pfes',
  templateUrl: './ancien-pfes.component.html',
  styleUrls: ['./ancien-pfes.component.css']
})
export class AncienPfesComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: SujetPFE[] = [];
  anciensPfes: SujetPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', "Encadrant dans l'entreprise",'Rapport'];
  previous: string;

  maxVisibleItems: number = 8;
  filter_key: string = 'default';
  sujet: string = '';
  entreprise: string = '';
  changeFilter(event) {
    this.filter_key = event.target.value;

  }
  constructor(
    private pfeService:PfeService,
    private cdRef: ChangeDetectorRef,
    private modalService:NgbModal
    ){}
    loading=false;
  refresh(){
    this.loading=true;
    this.pfeService.getPfesByStatus(Status.Accepte).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.loading=false;
        this.elements = this.mdbTable.getDataSource();
        this.anciensPfes=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
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

  onKey(e){

    if (e.key==='Enter')
      this.searchItems()

  }
  searchItems() {



    const prev = this.mdbTable.getDataSource();
    if (this.sujet === '' && this.entreprise === '') {
      this.mdbTable.setDataSource(this.anciensPfes);
      this.elements = this.anciensPfes;
      return;
    }

    this.elements = this.anciensPfes.filter((item) => {
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
    this.pfeService.getRapport(id).subscribe(
      (res) => {
        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=res;
      }
    )
  }




}
