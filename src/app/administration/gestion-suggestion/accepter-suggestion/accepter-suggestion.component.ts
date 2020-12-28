import { GestionSuggestionService } from './../gestion-suggestion.service';
import { SuggestionPFE } from './../models/suggestion-pfe.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Status } from '../enums/status.enum';

@Component({
  selector: 'app-accepter-suggestion',
  templateUrl: './accepter-suggestion.component.html',
  styleUrls: ['./accepter-suggestion.component.css']
})
export class AccepterSuggestionComponent implements OnInit {
  data:SuggestionPFE;
  action: Subject<any> = new Subject();

  constructor(private suggestionService:GestionSuggestionService,public modalRef: MDBModalRef) {}

  submitted=false;

  accepter() {
    this.submitted=true;
    this.suggestionService.changerStatus(this.data._id,Status.Accepte).subscribe(
      (data)=>{this.action.next(data);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }

  ngOnInit(){
  }
}
