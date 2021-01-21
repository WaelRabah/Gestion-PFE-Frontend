import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-reinitialiser-mdp',
  templateUrl: './reinitialiser-mdp.component.html',
  styleUrls: ['./reinitialiser-mdp.component.css'],
})
export class ReinitialiserMdpComponent implements OnInit {
  submitted = false;
  token: string;
  constructor(
    private authentificationService: AuthentificationService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {}
  recover(resetPasswordData: NgForm) {
    this.submitted = true;

    this.authentificationService
      .reset(this.token, resetPasswordData.value)
      .subscribe(
        (response) => {
          // Storing the token
          this.toastr.success(
            'Réinitialisation du mdp réussite',
            'Mot de passe',
            { positionClass: 'toast-bottom-left' }
          );
          this.router.navigate(['']);
        },
        (erreur) => {
          this.toastr.error(
            "Le token n'éxiste pas",
            'Erreur de réinitialisation de mot de passe',
            { positionClass: 'toast-bottom-left' }
          );
          this.submitted = false;
        }
      );
  }
}
