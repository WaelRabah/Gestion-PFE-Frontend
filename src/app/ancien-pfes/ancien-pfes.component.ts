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
  allStudents: SujetPFE[] = [];

  headElements = ['Sujet', 'Entreprise', 'Description', "Encadrant dans l'entreprise",'Dossier'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private pfeService:PfeService,
    private cdRef: ChangeDetectorRef,
    private modalService:NgbModal
    ){}

  refresh(){
    this.pfeService.getPfesByStatus(Status.Accepte).subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allStudents=etudiants;
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
    this.pfeService.getPDF(id).subscribe(
      (res) => {
        const modalRef= this.modalService.open(PdfJsViewerComponent,{size:'xl',centered:true,windowClass: 'pdfViewer' });
        modalRef.componentInstance.pdfSrc=res;
      }
    )
  }




}
