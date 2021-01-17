import { EtudiantService } from './../services/etudiant.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-rapport-pfe',
  templateUrl: './upload-rapport-pfe.component.html',
  styleUrls: ['./upload-rapport-pfe.component.css']
})
export class UploadRapportPfeComponent implements OnInit {

  fileToUpload : File = null;
  fileIsValid : boolean = null;
  fileSizeError : boolean = null;
  fileTypeError : boolean = null;

  submitted = false;
  success = false;

  constructor(
    private etudiantService: EtudiantService,
    private authService : AuthentificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
    this.fileTypeError = this.fileToUpload.type != 'application/pdf';
    this.fileSizeError = this.fileToUpload.size > 50000000;
    this.fileIsValid = !this.fileSizeError && !this.fileTypeError

  }

  onSubmit(form:NgForm){
    this.submitted = true;
    const formData = new FormData();
    formData.append('file',this.fileToUpload,'rapport-pfe-'+this.authService.getUserName());
    this.etudiantService.ajouterSujet(formData).subscribe({
      error: (error) => {
        this.submitted = false;
        this.toastr.error("Veuillez réssayer ultérieurement",'Une erreur est survenue',{positionClass:'toast-bottom-right'});
        console.log(error)
      },
      complete: () => this.success = true,
    }
    )
  }

}
