import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  ɵɵqueryRefresh,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
  MDBModalRef,
  MDBModalService,
} from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';

interface SearchObj {
  nom: string;
  prenom: string;
  email: string;
  filiere: string;
}
@Component({
  selector: 'affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css'],
})
export class AfficheComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: Etudiant[] = [];
  allStudents: Etudiant[] = [];

  headElements = ['nom', 'prenom', 'filiere', 'niveau', 'email', 'action'];
  searchObj: SearchObj = {
    nom: '',
    prenom: '',
    email: '',
    filiere: 'default',
  };
  previous: string;

  maxVisibleItems: number = 8;

  constructor(
    private etudiantService: EtudiantService,
    private cdRef: ChangeDetectorRef
  ) {}

  delete(id) {
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
          (etudiants) => {
            this.refresh();
          },
          (error) => console.log(error)
        );
        Swal.fire('Supprimée!', "L'etudiant a été archivée", 'success');
      }
    });
  }
  refresh() {
    this.etudiantService.getEtudiants().subscribe(
      (etudiants) => {
        this.elements = etudiants;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.allStudents = etudiants;
        this.previous = this.mdbTable.getDataSource();
      },
      (error) => console.log(error)
    );
  }
  @Output() editEtudiant = new EventEmitter<Etudiant>();

  openEditModal(etudiant: Etudiant) {
    this.editEtudiant.emit(etudiant);
  }
  @Input() refreshTable: Subject<boolean> = new Subject<boolean>();
  @Input() search: Subject<SearchObj> = new Subject<SearchObj>();

  ngOnInit() {
    this.refreshTable.subscribe((response) => {
      if (response) {
        this.refresh();
        // Or do whatever operations you need.
      }
    });
    this.search.subscribe((response) => {
      this.searchObj = response;

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
    const { nom, prenom, filiere, email } = this.searchObj;
    const searchEmail = email;
    const searchFiliere = filiere;
    const prev = this.mdbTable.getDataSource();
    if (nom === '' && prenom === '' && email === '' && filiere === 'default') {
      this.mdbTable.setDataSource(this.allStudents);
      this.elements = this.allStudents;
      return;
    }

    this.elements = this.allStudents.filter((item) => {
      const { firstname, lastname, filiere, email } = item;

      return (
        (prenom ? firstname.includes(prenom) : true) &&
        (nom ? lastname.includes(nom) : true) &&
        (searchEmail ? email.includes(searchEmail) : true) &&
        (searchFiliere !== 'default' ? filiere.includes(searchFiliere) : true)
      );
    });

    this.mdbTable.setDataSource(this.elements);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }
}
