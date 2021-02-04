import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EtudiantService } from '../services/etudiant.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-ajoute-etud-csv',
  templateUrl: './ajoute-etud-csv.component.html',
  styleUrls: ['./ajoute-etud-csv.component.css']
})
export class AjouteEtudCsvComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
    constructor(private cdRef: ChangeDetectorRef, private ngxCsvParser: NgxCsvParser, private etudiantService:EtudiantService, public modalRef: MDBModalRef) { }
    csvRecords: any[] = [];
    header = true;
    submitted = false;
    files ;
    elements: any = [];
    previous: any = [];
    headElements = ['Nom', 'Prenom' , 'Filiere', 'Niveau', 'Email'];
    ngOnInit(): void {
    };

    fileChangeListener($event): void{
      this.csvRecords= [];

      this.files = $event.srcElement.files;
      this.ngxCsvParser.parse(this.files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        this.afficher();
      });

    }

  valider(): void{
    this.ngxCsvParser.parse(this.files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.etudiantService.addEtudiants(result).subscribe(
          (result)=>{this.submitted=false;this.modalRef.hide();},
          (error)=>{
            console.log("Mochkla")
            this.submitted=false;
            console.log(error);}
        )
      });
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  afficher(): void{
    this.elements=[];
    for (var i = 0; i < this.csvRecords.length; i++)
    {
    this.elements.push({nom: this.csvRecords[i].lastname, prenom: this.csvRecords[i].firstname, filiere: this.csvRecords[i].filiere, niveau: this.csvRecords[i].niveau ,email: this.csvRecords[i].email });
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();

  }

  }

