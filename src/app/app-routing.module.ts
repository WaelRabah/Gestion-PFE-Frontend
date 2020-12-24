import { AlreadyLoggedinGuard } from './guards/already-loggedin.guard';
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdministrationGuard } from './guards/administration.guard';
import { EnseignantGuard } from './guards/enseignant.guard';
import { EtudiantGuard } from './guards/etudiant.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {

    path: 'Etudiant',
    canActivate: [EtudiantGuard],
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: 'Enseignant',
    canActivate: [EnseignantGuard],
    loadChildren: () => import('./enseignant/enseignant.module').then(m => m.EnseignantModule)
  },
  {
    path: 'Administrateur',
    canActivate: [AdministrationGuard],
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {
    path: 'login',
    canActivate: [AlreadyLoggedinGuard],
    component: LoginComponent
  },
  {
    path: 'acces-refuse',
    component: AccesRefuseComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
