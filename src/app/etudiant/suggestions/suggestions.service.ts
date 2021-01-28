import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuggestionPFE } from 'src/app/enseignant/models/suggestion-pfe.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  userRoute="suggest-pfe/";

  constructor(
    private http: HttpClient
  ) { }
  getSuggestions(): Observable<SuggestionPFE[]>{
    return this.http.post<SuggestionPFE[]>(environment.backendUrl+this.userRoute+'allSuggestion',null);
  }


  getPDF(id: string){
    return this.http.get(environment.backendUrl+this.userRoute+`pdf/${id}`,{responseType:'blob'});
  }
}

