import { SuggestionPFE } from './models/suggestion-pfe.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from './enums/status.enum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionSuggestionService {

  constructor(
    private http: HttpClient
  ) { }

  userRoute="suggest-pfe/";


  getSuggestionsByStatus(status: Status): Observable<SuggestionPFE[]>{
    return this.http.post<SuggestionPFE[]>(environment.backendUrl+this.userRoute+'search',{status});
  }

  changerStatus(id: string, status: string): Observable<any> {
    return this.http.put(environment.backendUrl+this.userRoute+`valider/${id}`,{status});
  }

  getPDF(id: string){
    return this.http.get(environment.backendUrl+this.userRoute+`pdf/${id}`,{responseType:'blob'});
  }
}
