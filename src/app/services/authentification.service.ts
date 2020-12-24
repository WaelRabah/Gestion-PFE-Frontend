import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  loggedInSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { 
    this.loggedInSubject.next(!!localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  login(data): Observable<any>{
    return this.http.post(`${environment.backendUrl}auth/login`,data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getRole(): string {
    return this.isAuthenticated() ? JSON.parse(localStorage.getItem('user')).role : ''
  }
}
