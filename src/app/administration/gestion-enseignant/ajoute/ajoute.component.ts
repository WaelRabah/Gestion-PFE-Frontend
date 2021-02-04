import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EnseignantService } from '../services/enseignant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ajoute',
  templateUrl: './ajoute.component.html',
  styleUrls: ['./ajoute.component.css']
})
export class AjouteEnsComponent implements OnInit {
  action: Subject<any> = new Subject();
  submitted = false;

  constructor(private enseignantService:EnseignantService,
    private toastr: ToastrService,
    public modalRef: MDBModalRef) {}

  add(enseignantForm: NgForm) {
    this.submitted=true;
    enseignantForm.value.role="Enseignant";
    enseignantForm.value.username=enseignantForm.value.firstname+enseignantForm.value.lastname;
    this.enseignantService.addEnseignant(enseignantForm.value).subscribe(
      (enseignant)=>{this.submitted=false;this.action.next(enseignant);this.modalRef.hide();},
      (error)=>{
        this.toastr.error('L\'enseignant existe',"Echec",{positionClass:'toast-bottom-left'});
        this.submitted=false;}
    )
  }

  ngOnInit(): void {
  }

}
