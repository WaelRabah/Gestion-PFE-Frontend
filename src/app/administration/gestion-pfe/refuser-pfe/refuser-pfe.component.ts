import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from '../enums/status.enum';
import { SujetPFE } from '../models/pfe.model';
import { PfeService } from '../services/pfe.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-refuser-pfe',
  templateUrl: './refuser-pfe.component.html',
  styleUrls: ['./refuser-pfe.component.css']
})
export class RefuserPfeComponent implements OnInit {
  data:SujetPFE;
  action: Subject<any> = new Subject();

  constructor(private pfeService:PfeService,public modalRef: MDBModalRef) {}

  submitted=false;

  refuser() {
    this.submitted=true;
    this.pfeService.changerStatus(this.data._id,Status.Refuse).subscribe(
      (etudiant)=>{this.action.next(etudiant);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }

  ngOnInit(){
  }

}
