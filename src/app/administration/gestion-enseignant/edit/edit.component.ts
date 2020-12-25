import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EnseignantService } from '../services/enseignant.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditEnsComponent implements OnInit {
  data:any;
  action: Subject<any> = new Subject();
  constructor(private enseignantService:EnseignantService,public modalRef: MDBModalRef) {}
  submitted=false;
  edit(enseignantForm: NgForm) {
    enseignantForm.value.role="Enseignant";
    enseignantForm.value._id=this.data._id;
    this.submitted=true;
    enseignantForm.value.username=enseignantForm.value.firstname+enseignantForm.value.lastname;
    console.log(enseignantForm.value);
    this.enseignantService.updateEnseignant(enseignantForm.value).subscribe(
      (enseignant)=>{this.action.next(enseignant);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }
  ngOnInit(){
    console.log(this.data);
  }

}
