import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService,
    private router: Router
    ){ }

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.authentificationService.login(loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.id);
        this.router.navigate(['etudiant']);
      },
      (erreur) => {
        alert('Veuillez vérifier vos credentials');
      }
    );
  }

}
