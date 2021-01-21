import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef, ɵɵqueryRefresh, Input, EventEmitter, Output } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Enseignant } from '../models/enseignant';
import {EnseignantService} from '../services/enseignant.service';
interface SearchObj {
  nom: string;
  prenom: string;
  email: string;
  grade: string;
  departement : string;
}
@Component({
  selector: 'app-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css']
})
export class AfficheEnsComponent  implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  searchObj: SearchObj = {
    nom: '',
    prenom: '',
    email: '',
    grade: 'default',
    departement : 'default'
  };
  elements: Enseignant[] = [];
  allTeachers: Enseignant[] = [];

  headElements = ['nom', 'prenom', 'departement', 'grade','email','action'];
 
  previous: string;

  maxVisibleItems: number = 8;

  constructor(private enseignantService:EnseignantService,private cdRef: ChangeDetectorRef){}

  delete(id){
   
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Archiver l'enseignant",
    }).then((result) => {
      if (result.isConfirmed) {
        this.enseignantService.deleteEnseignant(id).subscribe(
          (enseignants)=>{this.refresh();},
          (error)=>console.log(error)
        )
        Swal.fire('Supprimée!', "L'enseignant a été archivée", 'success');
      }
    });
    
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
    const { nom, prenom, grade, email ,departement} = this.searchObj;
    const searchEmail = email;
    const searchGrade = grade;
    const searchDep = departement;
    const prev = this.mdbTable.getDataSource();
    if (nom === '' && prenom === '' && email === '' && grade === 'default' && departement === 'default') {
      this.mdbTable.setDataSource(this.allTeachers);
      this.elements = this.allTeachers;
      return;
    }

    this.elements = this.allTeachers.filter((item) => {
      const { firstname, lastname, grade, email,departement } = item;
    
      return (
        (prenom ? firstname.includes(prenom) : true) &&
        (nom ? lastname.includes(nom) : true) &&
        (searchEmail ? email.includes(searchEmail) : true) &&
        (searchGrade !== 'default' ? grade.includes(searchGrade) : true) &&
        (searchDep !== 'default' ? departement.includes(searchDep) : true)
      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }
}
