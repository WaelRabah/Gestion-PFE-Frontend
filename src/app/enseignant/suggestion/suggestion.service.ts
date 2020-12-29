import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../enums/status.enum';
import { SuggestionPFE } from '../models/suggestion-pfe.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(
    private http: HttpClient
  ) { }

  userRoute="suggest-pfe/";


  getSuggestionsByEnseignantId(enseignantId: string): Observable<SuggestionPFE[]>{
    return this.http.post<SuggestionPFE[]>(environment.backendUrl+this.userRoute+'search',{enseignantId});
  }


  getPDF(id: string){
    return this.http.get(environment.backendUrl+this.userRoute+`pdf/${id}`,{responseType:'arraybuffer'});
  }
}
