import { PfeService } from './../services/pfe.service';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import {SujetPFE} from '../models/pfe.model';
import { Status } from '../enums/status.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

interface SearchObj {
  sujet: string;
  entreprise: string;

}
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

  headElements = ['Sujet', 'Entreprise', 'Description', "Encadrant dans l'entreprise",'Dossier','Action'];
  searchObj: SearchObj = {
    sujet : '',
    entreprise  :''
  };
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private pfeService:PfeService,
    private cdRef: ChangeDetectorRef,
    private modalService:NgbModal
    ){}
loading=false;
  refresh(){
    this.loading=true;
    this.pfeService.getPfesByStatus(Status.Attente).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.loading=false;
        this.elements = this.mdbTable.getDataSource();
        this.allStudents=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() accepterSujet = new EventEmitter<SujetPFE>();

  openAccepterModal(sujetPfe:SujetPFE){
    this.accepterSujet.emit(sujetPfe);
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
      this.mdbTable.setDataSource(this.allStudents);
      this.elements = this.allStudents;
      return;
    }

    this.elements = this.allStudents.filter((item) => {
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
    this.pfeService.getPDF(id).subscribe(
      (res) => {
        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=res;
      }
    )
  }

  @Output() refuserSujet = new EventEmitter<SujetPFE>();

  openRefuserModal(sujetPfe: SujetPFE) {
    this.refuserSujet.emit(sujetPfe);
  }



}
