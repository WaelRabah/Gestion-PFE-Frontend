import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {

  constructor( private sessionService:SessionService , private route : Router ) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm){
    this.sessionService.storeSession(form.value).subscribe( data => {
      this.sessionService.addSession(data as Session)
      this.route.navigate(["/Session"]);
    });
  }

  onClear(){
    this.route.navigate(["/Session"]);
  }
}
