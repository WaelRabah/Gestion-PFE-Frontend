import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../models/enseignant';
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http:HttpClient) { }

  userRoute="utilisateurs/";

  getEnseignants():Observable<Enseignant[]>{
    return this.http.get<Enseignant[]>(environment.backendUrl+this.userRoute+'Enseignant');
  }
  addEnseignant(enseignant:Enseignant):Observable<Enseignant>{
    return this.http.post<Enseignant>(environment.backendUrl+this.userRoute+"register",enseignant);
  }
  updateEnseignant(enseignant:Enseignant):Observable<Enseignant>{
    return this.http.put<Enseignant>(environment.backendUrl+this.userRoute+enseignant._id,enseignant);
  }
  deleteEnseignant(id):Observable<Enseignant>{
    return this.http.delete<Enseignant>(environment.backendUrl+this.userRoute+id);
  }

  addEnseignants(enseignants:Enseignant[]):Observable<Enseignant[]>{
    return this.http.post<Enseignant[]>(environment.backendUrl+this.userRoute+"registerAll",enseignants);
  }
}
