import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EnseignantService } from '../../services/enseignant.service';

@Component({
  selector: 'app-ajoute-ens-csv',
  templateUrl: './ajoute-ens-csv.component.html',
  styleUrls: ['./ajoute-ens-csv.component.css']
})
export class AjouteEnsCsvComponent implements OnInit {

  constructor(private ngxCsvParser: NgxCsvParser, private enseignantService:EnseignantService, public modalRef: MDBModalRef) { }
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
        this.enseignantService.addEnseignants(result).subscribe(
          (result)=>{this.submitted=false;this.modalRef.hide();},
          (error)=>{this.submitted=false;console.log(error);}
        )
      });
  }



}
