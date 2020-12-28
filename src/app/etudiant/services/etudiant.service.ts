import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {SujetPFE} from '../models/sujet-pfe.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(
    private http: HttpClient
  ) { }


  ajouterSujet(sujet): Observable<any> {
    return this.http.post<SujetPFE>(environment.backendUrl+'pfes',sujet);
  }
}
