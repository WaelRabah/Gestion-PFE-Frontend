import { GestionSuggestionService } from './../gestion-suggestion.service';
import { SuggestionPFE } from './../models/suggestion-pfe.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from '../../gestion-pfe/enums/status.enum';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-refuser-suggestion',
  templateUrl: './refuser-suggestion.component.html',
  styleUrls: ['./refuser-suggestion.component.css']
})
export class RefuserSuggestionComponent implements OnInit {
  data:SuggestionPFE;
  action: Subject<any> = new Subject();

  constructor(private suggestionService:GestionSuggestionService,public modalRef: MDBModalRef) {}

  submitted=false;

  refuser() {
    this.submitted=true;
    this.suggestionService.changerStatus(this.data._id,Status.Refuse).subscribe(
      (etudiant)=>{this.action.next(etudiant);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }

  ngOnInit(){
  }
}
