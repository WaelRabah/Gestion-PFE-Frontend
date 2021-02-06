import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  data:any;
  action: Subject<Etudiant> = new Subject();
  constructor(private etudiantService:EtudiantService,public modalRef: MDBModalRef) {}
  submitted=false;
  edit(etudiantForm: NgForm) {
    etudiantForm.value.role="Etudiant";
    etudiantForm.value._id=this.data._id;
    this.submitted=true;
    etudiantForm.value.username=etudiantForm.value.firstname+etudiantForm.value.lastname;

    this.etudiantService.updateEtudiant(etudiantForm.value).subscribe(
      (etudiant)=>{this.action.next(etudiant);this.modalRef.hide();this.submitted=false;},
      (error)=>{this.submitted=false;console.log(error);}
    )
  }
  ngOnInit(){
  }

}
