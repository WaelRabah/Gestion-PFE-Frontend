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

  userRoute="pfes/";


  getPfesByStatus(status: Status): Observable<SujetPFE[]>{
    return this.http.post<SujetPFE[]>(environment.backendUrl+this.userRoute+'search',{status});
  }

  changerStatus(id: string, status: string): Observable<any> {
    return this.http.put(environment.backendUrl+this.userRoute+`valider/${id}`,{status});
  }

  getPDF(id: string){
    return this.http.get(environment.backendUrl+this.userRoute+`pdf/${id}`,{responseType:'arraybuffer'});
  }
}
