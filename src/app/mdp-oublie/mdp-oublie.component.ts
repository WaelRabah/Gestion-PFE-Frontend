import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.css'],
})
export class MdpOublieComponent implements OnInit {
  submitted = false;

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  recover(recoverData: NgForm) {
    this.submitted = true;

    this.authentificationService.recover(recoverData.value).subscribe(
      (response) => {
        // Storing the token
        this.toastr.info(
          'Veuillez consulter votre email',
          'Lien de récupération envoyé',
          { positionClass: 'toast-bottom-left' }
        );
        this.router.navigate(['']);
      },
      (erreur) => {
        this.toastr.error(
          "Votre email n'éxiste pas",
          'Erreur de récupération de mot de passe',
          { positionClass: 'toast-bottom-left' }
        );
        this.submitted = false;
      }
    );
  }
}
