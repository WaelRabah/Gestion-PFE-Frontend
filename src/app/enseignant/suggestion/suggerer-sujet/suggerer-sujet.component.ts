import { EnseignantService } from '../../enseignant.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-suggerer-sujet',
  templateUrl: './suggerer-sujet.component.html',
  styleUrls: ['./suggerer-sujet.component.css']
})
export class SuggererSujetComponent implements OnInit {

  submitted = false;

  fileToUpload : File = null;
  fileIsValid : boolean = null;
  fileSizeError : boolean = null;
  fileTypeError : boolean = null;

  success = false;
  constructor(
    private enseignantService: EnseignantService,
    private authService : AuthentificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    const formData = new FormData();
    formData.append('file',this.fileToUpload,'sujet-pfe-'+this.authService.getUserName());
    this.enseignantService.suggererSujet(this.convertToFormData(form)).subscribe({
      error: (error) => {
        this.submitted = false;
        this.toastr.error("Veuillez réssayer ultérieurement",'Une erreur est survenue',{positionClass:'toast-bottom-right'});
        console.log(error)
      },
      complete: () => this.success = true,
    }
    )
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
    this.fileTypeError = this.fileToUpload.type != 'application/pdf';
    this.fileSizeError = this.fileToUpload.size > 20000000;
    this.fileIsValid = !this.fileSizeError && !this.fileTypeError

  }

  convertToFormData(form:NgForm) {
    const formData = new FormData();
    for (var key in form.value){
      formData.append(key,form.value[key])
    }
    formData.set('file',this.fileToUpload,'suggestion-pfe-'+this.authService.getUserName());

    return formData;
  }
}
