import { AfterViewInit, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private sessionService: SessionService, private router: Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = params['id'];
        this.session = this.sessionService.getSessionById(this.id.toString())
        setTimeout(() => {
          this.form.setValue({
            numero: this.session.numero,
            president: this.session.president,
            filiere : this.session.filiere,
            date: this.session.date
          });
        });
      }
    )

  }


  onSubmit(form:NgForm){
    this.sessionService.UpdateSession(form,this.id.toString())
  }

  onClear(){
    this.form.reset();
    this.router.navigate(['/Session']);
  }

}
