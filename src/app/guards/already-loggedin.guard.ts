import { AuthentificationService } from './../services/authentification.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedinGuard implements CanActivate {

  constructor(
    private authenticationService: AuthentificationService,
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authenticationService.isAuthenticated()){
        this.router.navigate([this.authenticationService.getRole()]);
        return false;
      }
    return true;
  }
  
}
