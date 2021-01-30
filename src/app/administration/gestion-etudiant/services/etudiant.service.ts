import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant'
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) { }

  userRoute="utilisateurs";

  getEtudiants():Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(environment.backendUrl+this.userRoute+'?role=Etudiant');
  }
  addEtudiant(etudiant:Etudiant):Observable<Etudiant>{
    return this.http.post<Etudiant>(environment.backendUrl+this.userRoute+"/newEtudiant",etudiant);
  }
  updateEtudiant(etudiant:Etudiant):Observable<Etudiant>{
    return this.http.put<Etudiant>(environment.backendUrl+this.userRoute+'/'+etudiant._id,etudiant);
  }
  deleteEtudiant(id):Observable<Etudiant>{
    return this.http.delete<Etudiant>(environment.backendUrl+this.userRoute+'/'+id);
  }
  addEtudiants(etudiants:Etudiant[]):Observable<Etudiant[]>{
    return this.http.post<Etudiant[]>(environment.backendUrl+this.userRoute+"/newEtudiants",etudiants);
  }
}
