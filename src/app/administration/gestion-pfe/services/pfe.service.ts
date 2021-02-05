import { Status } from './../enums/status.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SujetPFE } from '../models/pfe.model';

@Injectable({
  providedIn: 'root'
})
export class PfeService {

  constructor(
    private http: HttpClient
  ) { }

  route="pfes/";


  getPfesByStatus(status: Status): Observable<SujetPFE[]>{
    return this.http.post<SujetPFE[]>(environment.backendUrl+this.route+'search',{status});
  }
  getPfes(): Observable<SujetPFE[]>{
    return this.http.get<SujetPFE[]>(environment.backendUrl+this.route);
  }

  changerStatus(id: string, status: string): Observable<any> {
    return this.http.put(environment.backendUrl+this.route+`valider/${id}`,{status});
  }

  getPDF(id: string){
    return this.http.get(environment.backendUrl+this.route+`pdf/${id}`,{responseType:'blob'});
  }

  getRapport(id: string){
    return this.http.get(environment.backendUrl+this.route+`rapport/${id}`,{responseType:'blob'});
  }
}
