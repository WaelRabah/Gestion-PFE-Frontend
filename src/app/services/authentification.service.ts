import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  login(data): Observable<any>{
    console.log("I am the server here")
    return this.http.post(`${environment.backendUrl}auth/login`,data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
