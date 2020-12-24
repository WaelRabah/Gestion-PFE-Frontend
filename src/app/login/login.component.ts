import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { JwtHelperService } from "@auth0/angular-jwt";
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
        localStorage.setItem('token', response.token);
        //JWT helper service to decode the token
        const helper = new JwtHelperService();
        //Decoded Token
        const decodedToken = helper.decodeToken(response.token);
        localStorage.setItem('user', JSON.stringify(decodedToken));
        //Check if the token is expired
        const isExpired = helper.isTokenExpired(response.token);
        if (isExpired == false){
        this.authentificationService.loggedInSubject.next(true);
        this.router.navigate([this.authentificationService.getRole()]);
      }
      },
      (erreur) => {
        this.toastr.error('Veuillez vérifier vos identifiants',"Erreur d'authentification",{positionClass:'toast-bottom-left'});
        this.submitted = false;
      }
    );
  }



}
