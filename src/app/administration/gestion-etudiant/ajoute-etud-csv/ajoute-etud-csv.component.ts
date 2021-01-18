import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-ajoute-etud-csv',
  templateUrl: './ajoute-etud-csv.component.html',
  styleUrls: ['./ajoute-etud-csv.component.css']
})
export class AjouteEtudCsvComponent implements OnInit {

  constructor(private ngxCsvParser: NgxCsvParser, private etudiantService:EtudiantService, public modalRef: MDBModalRef) { }
  csvRecords: any[] = [];
  header = true;
  submitted = false;

  ngOnInit(): void {
  };

  fileChangeListener($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        this.etudiantService.addEtudiants(result).subscribe(
          (result)=>{this.submitted=false;this.modalRef.hide();},
          (error)=>{this.submitted=false;console.log(error);}
        )
      });
  }


}
