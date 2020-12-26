import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Soutenance } from '../models/soutenance.model';
import { environment } from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  constructor(private readonly http:HttpClient) { }
  route="soutenances/session/";

  getSoutenancesBySessionId(sessionId : string):Observable<any[]>{
    return this.http.get<any[]>(environment.backendUrl+this.route+sessionId);
  }
  getSoutenance(id : string):Observable<any>{
    return this.http.get<any>(environment.backendUrl+"soutenances/"+id);
  }
  getUnassignedPfes():Observable<Soutenance[]>{
    return this.http.get<Soutenance[]>(environment.backendUrl+"pfes/unassigned");
  }
  addSoutenanceToSession(data):Observable<any>{
    return this.http.post<any>(environment.backendUrl+"soutenances",data);
  }
  updateSoutenance(data,id:string):Observable<any>{
    return this.http.put<any>(environment.backendUrl+"soutenances/"+id,data);
  }
  removeSoutenanceFromSession(sout,sess):void{
    let soutenace={...sout}
    let session={...sess}
    session.soutenanceId=null
    soutenace.sessionId=null
    
    this.http.put<any>(environment.backendUrl+"soutenances/"+soutenace._id,soutenace)
    .subscribe(data=>{

    })
    this.http.put<any>(environment.backendUrl+"sessions/"+session._id,session)
    .subscribe(data=>{
      
    })
  }
}
