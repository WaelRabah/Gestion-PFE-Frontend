import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {
  @ViewChild('f') form:NgForm;
  constructor( private sessionService:SessionService , private route : Router,public modalRef: MDBModalRef ) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm){
    this.sessionService.storeSession(form.value).subscribe( (data: Session )=> {
      this.form.reset();
      data.date = data.date.slice(0,10);
      this.sessionService.addSession(data)
      this.modalRef.hide();
    });
  }

  onClear(){
    this.form.reset();
    this.route.navigate(["/Administrateur/session"]);
  }
}
