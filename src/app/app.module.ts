import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AccesRefuseComponent } from './acces-refuse/acces-refuse.component';

export function tokenGetter(){
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AccesRefuseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:3000"],
        disallowedRoutes: [""],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
