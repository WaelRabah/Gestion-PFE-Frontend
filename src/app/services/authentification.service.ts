import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  setLoggedData(response: any) {
    localStorage.setItem('token', response.token);
    //JWT helper service to decode the token
    const helper = new JwtHelperService();
    //Decoded Token
    const decodedToken = helper.decodeToken(response.token);
    localStorage.setItem('user', JSON.stringify(decodedToken));
    //Check if the token is expired
    const isExpired = helper.isTokenExpired(response.token);
  }

  constructor(private http: HttpClient) {}

  logout() {
    localStorage.removeItem('token');
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.backendUrl}auth/login`, data);
  }
  recover(data): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}utilisateurs/recover/`,
      data
    );
  }
  reset(token, data): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}utilisateurs/reset/${token}`,
      data
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getRole(): string {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem('user')).role
      : '';
  }

  getUserName(): string {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem('user')).username
      : '';
  }

  getUserId(): string {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem('user'))._id
      : '';
  }
}
