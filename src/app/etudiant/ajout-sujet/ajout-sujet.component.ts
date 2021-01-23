import { EnseignantModel } from '../models/enseignant.model';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { EtudiantService } from './../services/etudiant.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-sujet',
  templateUrl: './ajout-sujet.component.html',
  styleUrls: ['./ajout-sujet.component.css']
})
export class AjoutSujetComponent implements OnInit {

  submitted = false;

  fileToUpload : File = null;
  fileIsValid : boolean = null;
  fileSizeError : boolean = null;
  fileTypeError : boolean = null;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  success = false;
  constructor(
    private etudiantService: EtudiantService,
    private authService : AuthentificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.etudiantService.getEnseignants().subscribe(
      {
        next: (data: EnseignantModel[]) => {
          this.dropdownList = data.map((x: EnseignantModel) => {
            return {item_id: x._id, item_text: x.firstname+' '+x.lastname}

          }
          )
        }
      }
    );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 2,
      maxHeight: 100
    };
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.etudiantService.ajouterSujet(this.convertToFormData(form)).subscribe({
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
    formData.append('enseignantsEncadrants',JSON.stringify(this.selectedItems.map(x => x.item_id)));
    formData.set('file',this.fileToUpload,'sujet-pfe-'+this.authService.getUserName());

    return formData;
  }

}
