import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Enseignant } from '../models/enseignant';
import {EnseignantService} from '../services/enseignant.service';

@Component({
  selector: 'app-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css']
})
export class AfficheEnsComponent  implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: Enseignant[] = [];
  allTeachers: Enseignant[] = [];

  headElements = ['nom', 'prenom', 'departement', 'grade','email','action'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(private enseignantService:EnseignantService,private cdRef: ChangeDetectorRef){}

  delete(id){
    this.enseignantService.deleteEnseignant(id).subscribe(
      (enseignants)=>{this.refresh();},
      (error)=>console.log(error)
    )
  }
  refresh(){
    this.enseignantService.getEnseignants().subscribe(
      (enseignants)=>{this.elements=enseignants;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allTeachers=enseignants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() editEnseignant = new EventEmitter<Enseignant>();

  openEditModal(enseignant:Enseignant){
    this.editEnseignant.emit(enseignant);

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
      this.mdbTable.setDataSource(this.allTeachers);
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
}
