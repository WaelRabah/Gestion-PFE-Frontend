import { NotFoundComponent } from './utils/not-found/not-found.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { AdministrationGuard } from './utils/guards/administration.guard';
import { EnseignantGuard } from './utils/guards/enseignant.guard';
import { EtudiantGuard } from './utils/guards/etudiant.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'etudiant',
    canActivate: [EtudiantGuard],
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: 'enseignant',
    canActivate: [EnseignantGuard],
    loadChildren: () => import('./enseignant/enseignant.module').then(m => m.EnseignantModule)
  },
  {
    path: 'administration',
    canActivate: [AdministrationGuard],
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
