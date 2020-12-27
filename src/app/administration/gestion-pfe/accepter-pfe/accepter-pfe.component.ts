import { SujetPFE } from '../models/pfe.model'
import { PfeService } from './../services/pfe.service';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import {Status} from '../enums/status.enum';

@Component({
  selector: 'app-accepter-pfe',
  templateUrl: './accepter-pfe.component.html',
  styleUrls: ['./accepter-pfe.component.css']
})
export class AccepterPfeComponent implements OnInit {
  data:SujetPFE;
  action: Subject<any> = new Subject();

  constructor(private pfeService:PfeService,public modalRef: MDBModalRef) {}

  submitted=false;

  accepter() {
    this.submitted=true;
    this.pfeService.changerStatus(this.data._id,Status.Accepte).subscribe(
      (etudiant)=>{this.action.next(etudiant);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }

  ngOnInit(){
  }
}
