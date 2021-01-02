import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { ReinitialiserMdpComponent } from './reinitialiser-mdp/reinitialiser-mdp.component';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor'
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AccesRefuseComponent,
    MdpOublieComponent,
    ReinitialiserMdpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    
  ],
 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
