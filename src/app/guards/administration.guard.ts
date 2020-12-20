import { AuthentificationService } from './../services/authentification.service';
import { Role } from './role.enum';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationGuard implements CanActivate {
  
  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authentificationService.isAuthenticated()){
        this.router.navigate(['login']);
        return false;
      }
      if(this.authentificationService.getRole()!=Role.admin){
        this.router.navigate(['acces-refuse']);
        return false
      }
    return true;
  }
  
}
