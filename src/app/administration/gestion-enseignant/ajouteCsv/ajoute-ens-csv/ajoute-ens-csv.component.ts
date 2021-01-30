import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EnseignantService } from '../../services/enseignant.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-ajoute-ens-csv',
  templateUrl: './ajoute-ens-csv.component.html',
  styleUrls: ['./ajoute-ens-csv.component.css']
})
export class AjouteEnsCsvComponent implements OnInit, AfterViewInit {
@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  constructor(private cdRef: ChangeDetectorRef, private ngxCsvParser: NgxCsvParser, private enseignantService:EnseignantService, public modalRef: MDBModalRef) { }
  csvRecords: any[] = [];
  header = true;
  submitted = false;
  files ;
  elements: any = [];
  previous: any = [];
  headElements = ['nom', 'prenom', 'departement', 'grade','email'];
  ngOnInit(): void {
  };

  fileChangeListener($event): void{
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
      this.enseignantService.addEnseignants(result).subscribe(
        (result)=>{this.submitted=false;this.modalRef.hide();},
        (error)=>{this.submitted=false;console.log(error);}
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
  for (var i = 0; i < this.csvRecords.length; i++)
  {
  this.elements.push({nom: this.csvRecords[i].lastname, prenom: this.csvRecords[i].firstname, departement: this.csvRecords[i].departement, grade: this.csvRecords[i].grade ,email: this.csvRecords[i].email });
  }
  this.mdbTable.setDataSource(this.elements);
  this.elements = this.mdbTable.getDataSource();
  this.previous = this.mdbTable.getDataSource();

}

}
