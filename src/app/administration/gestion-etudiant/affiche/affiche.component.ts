import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Etudiant } from '../models/etudiant';
import {EtudiantService} from '../services/etudiant.service';
@Component({
  selector: 'affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css']
})
export class AfficheComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: Etudiant[] = [];
  allStudents: Etudiant[] = [];

  headElements = ['nom', 'prenom', 'filiere', 'niveau','email','action'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  constructor(private etudiantService:EtudiantService,private cdRef: ChangeDetectorRef){}

  delete(id){
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Archiver l'etudiant",
    }).then((result) => {
      if (result.isConfirmed) {
        this.etudiantService.deleteEtudiant(id).subscribe(
          (etudiants)=>{this.refresh();},
          (error)=>console.log(error)
        )
        Swal.fire('Supprimée!', "L'etudiant a été archivée", 'success');
      }
    });
    
  }
  refresh(){
    this.etudiantService.getEtudiants().subscribe(
      (etudiants)=>{this.elements=etudiants;this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allStudents=etudiants;
        this.previous = this.mdbTable.getDataSource();},
      (error)=>console.log(error)
    )
  }
  @Output() editEtudiant = new EventEmitter<Etudiant>();

  openEditModal(etudiant:Etudiant){
    this.editEtudiant.emit(etudiant);

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
}