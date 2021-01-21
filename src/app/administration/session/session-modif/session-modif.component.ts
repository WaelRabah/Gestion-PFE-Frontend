import { AfterViewInit, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-modif',
  templateUrl: './session-modif.component.html',
  styleUrls: ['./session-modif.component.css']
})
export class SessionModifComponent implements OnInit  {
  id:number;
  session: Session;
  @ViewChild('form') form: NgForm;
  constructor(private sessionService: SessionService, private router: Router , private route: ActivatedRoute,public modalRef: MDBModalRef ) { }
  data:any;

  ngOnInit(): void {
    this.session = this.data;

  }


  onSubmit(form:NgForm){
    this.sessionService.UpdateSession(form,this.id.toString())
    this.modalRef.hide();
  }

  onClear(){
    this.form.reset();
    this.router.navigate(['/Administrateur/session']);
  }


}
