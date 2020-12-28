import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(
    private http: HttpClient
  ) { }

  suggererSujet(sujet): Observable<any> {
    return this.http.post(environment.backendUrl+'suggest-pfe',sujet);
  }
}
