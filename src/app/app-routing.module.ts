import { AlreadyLoggedinGuard } from './guards/already-loggedin.guard';
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';
import { LoginComponent } from './login/login.component';
import { AdministrationGuard } from './guards/administration.guard';
import { EnseignantGuard } from './guards/enseignant.guard';
import { EtudiantGuard } from './guards/etudiant.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { ReinitialiserMdpComponent } from './reinitialiser-mdp/reinitialiser-mdp.component';
import { AncienPfesComponent } from './ancien-pfes/ancien-pfes.component';
import { LoggedinGuard } from './guards/loggedin.guard';
const routes: Routes = [

  {
    path: 'ancien-pfes',
    component: AncienPfesComponent,
    canActivate:[LoggedinGuard]
  },
  {
    path: 'Etudiant',
    canActivate: [EtudiantGuard],
    loadChildren: () =>
      import('./etudiant/etudiant.module').then((m) => m.EtudiantModule),
  },
  {
    path: 'Enseignant',
    canActivate: [EnseignantGuard],
    loadChildren: () =>
      import('./enseignant/enseignant.module').then((m) => m.EnseignantModule),
  },
  {
    path: 'Administrateur',
    canActivate: [AdministrationGuard],
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'login',
    canActivate: [AlreadyLoggedinGuard],
    component: LoginComponent,
  },
  {
    path: 'mdp-oublie',
    canActivate: [AlreadyLoggedinGuard],
    component: MdpOublieComponent,
  },
  {
    path: 'réinitialisation-mdp/:token',
    canActivate: [AlreadyLoggedinGuard],
    component: ReinitialiserMdpComponent,
  },
  {
    path: 'acces-refuse',
    component: AccesRefuseComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
