[33mcommit 98b10979395241d002ccdc37764a5f8f19a8b151[m[33m ([m[1;36mHEAD -> [m[1;32mfix-bugs[m[33m)[m
Author: ZakariaNaaija <zakarianaaija@gmail.com>
Date:   Sun Dec 27 20:59:12 2020 +0100

    fixed bugs

[1mdiff --git a/src/app/administration/administration.module.ts b/src/app/administration/administration.module.ts[m
[1mindex c4a9b76..c69ee5a 100644[m
[1m--- a/src/app/administration/administration.module.ts[m
[1m+++ b/src/app/administration/administration.module.ts[m
[36m@@ -22,6 +22,11 @@[m [mimport { ListeComponent } from './session/gestion-soutenance/liste/liste.compone[m
 import { DetailComponent } from './session/gestion-soutenance/detail/detail.component';[m
 import { AjouterSoutenanceComponent } from './session/gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';[m
 import { ModifySoutenanceComponent } from './session/gestion-soutenance/modify-soutenance/modify-soutenance.component';[m
[32m+[m[32mimport { GestionPfeComponent } from './gestion-pfe/gestion-pfe.component';[m
[32m+[m[32mimport { AfficherPfeComponent} from './gestion-pfe/afficher-pfe/afficher-pfe.component';[m
[32m+[m[32mimport { RefuserPfeComponent} from './gestion-pfe/refuser-pfe/refuser-pfe.component';[m
[32m+[m[32mimport { AccepterPfeComponent} from './gestion-pfe/accepter-pfe/accepter-pfe.component';[m
[32m+[m
 @NgModule({[m
   declarations: [AdministrationComponent,[m
     SessionComponent,[m
[36m@@ -42,7 +47,11 @@[m [mimport { ModifySoutenanceComponent } from './session/gestion-soutenance/modify-s[m
     ListeComponent,[m
     DetailComponent,[m
     AjouterSoutenanceComponent,[m
[31m-    ModifySoutenanceComponent[m
[32m+[m[32m    ModifySoutenanceComponent,[m
[32m+[m[32m    GestionPfeComponent,[m
[32m+[m[32m    AccepterPfeComponent,[m
[32m+[m[32m    AfficherPfeComponent,[m
[32m+[m[32m    RefuserPfeComponent[m
     ],[m
   imports: [[m
     FilterPipeModule,[m
[1mdiff --git a/src/app/administration/gestion-pfe/afficher-pfe/afficher-pfe.component.ts b/src/app/administration/gestion-pfe/afficher-pfe/afficher-pfe.component.ts[m
[1mindex 1026e75..ae771bc 100644[m
[1m--- a/src/app/administration/gestion-pfe/afficher-pfe/afficher-pfe.component.ts[m
[1m+++ b/src/app/administration/gestion-pfe/afficher-pfe/afficher-pfe.component.ts[m
[36m@@ -3,7 +3,6 @@[m [mimport { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild,[m
 import { MdbTablePaginationComponent, MdbTableDirective, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';[m
 import { Subject } from 'rxjs';[m
 import {SujetPFE} from '../models/pfe.model';[m
[31m-import { saveAs } from 'file-saver';[m
 import { Status } from '../enums/status.enum';[m
 @Component({[m
   selector: 'app-afficher-pfe',[m
