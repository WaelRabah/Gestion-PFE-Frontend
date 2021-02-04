import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { EtudiantService } from '../services/etudiant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ajoute',
  templateUrl: './ajoute.component.html',
  styleUrls: ['./ajoute.component.css']
})
export class AjouteComponent implements OnInit {
  action: Subject<any> = new Subject();
  submitted = false;

  constructor(private etudiantService:EtudiantService,
    private toastr: ToastrService,
    public modalRef: MDBModalRef) {}

  add(etudiantForm: NgForm) {
    this.submitted=true;
    etudiantForm.value.role="Etudiant";
    etudiantForm.value.username=etudiantForm.value.firstname+etudiantForm.value.lastname;

    this.etudiantService.addEtudiant(etudiantForm.value).subscribe(
      (etudiant)=>{this.submitted=false;this.action.next(etudiant);this.modalRef.hide();},
      (error)=>{
        this.toastr.error('L\'étudiant existe',"Echec",{positionClass:'toast-bottom-left'});
        this.submitted=false;}
    )
  }

  ngOnInit(): void {
  }

}
