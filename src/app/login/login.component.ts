import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  submitted = false;


  constructor(private authentificationService: AuthentificationService,
    private router: Router,
    private toastr: ToastrService
    ){ }

  ngOnInit(): void {}
  login(loginForm: NgForm) {
    this.submitted = true;

    this.authentificationService.login(loginForm.value).subscribe(
      (response) => {
        // Storing the token
        this.authentificationService.setLoggedData(response);
        this.router.navigate([this.authentificationService.getRole()]);
      },
      (erreur) => {
        this.toastr.error('Veuillez vérifier vos identifiants',"Erreur d'authentification",{positionClass:'toast-bottom-left'});
        this.submitted = false;
      }
    );
  }



}
