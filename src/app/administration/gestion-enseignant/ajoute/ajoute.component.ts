import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EnseignantService } from '../services/enseignant.service';
@Component({
  selector: 'app-ajoute',
  templateUrl: './ajoute.component.html',
  styleUrls: ['./ajoute.component.css']
})
export class AjouteEnsComponent implements OnInit {
  action: Subject<any> = new Subject();
  submitted = false;

  constructor(private enseignantService:EnseignantService,public modalRef: MDBModalRef) {}

  add(enseignantForm: NgForm) {
    this.submitted=true;
    enseignantForm.value.role="Enseignant";
    enseignantForm.value.username=enseignantForm.value.firstname+enseignantForm.value.lastname;
    console.log(enseignantForm.value);
    this.enseignantService.addEnseignant(enseignantForm.value).subscribe(
      (enseignant)=>{this.submitted=false;this.action.next(enseignant);this.modalRef.hide();},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }

  ngOnInit(): void {
  }

}
