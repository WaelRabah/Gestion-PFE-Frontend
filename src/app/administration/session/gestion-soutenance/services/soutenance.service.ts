import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Soutenance } from '../models/soutenance.model';
import { environment } from '../../../../../environments/environment'
import { helpers } from 'chart.js';
@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  constructor(private readonly http: HttpClient) { }
  route = "soutenances/session/";

  getSoutenancesBySessionId(sessionId: string): Observable<any[]> {
    const token = localStorage.getItem("token")
    return this.http.get<any[]>(environment.backendUrl + this.route + sessionId, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  }
  getSoutenance(id: string): Observable<any> {
    return this.http.get<any>(environment.backendUrl + "soutenances/" + id);
  }
  getUnassignedPfes(): Observable<Soutenance[]> {
    const token = localStorage.getItem("token")
    return this.http.get<Soutenance[]>(environment.backendUrl + "pfes/unassigned", {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  }
  addSoutenanceToSession(data): Observable<any> {
    return this.http.post<any>(environment.backendUrl + "soutenances", data);
  }
  updateSoutenance(data, id: string): Observable<any> {
    return this.http.put<any>(environment.backendUrl + "soutenances/" + id, data);
  }
  archiverSoutenance(sout, sess) {
    let soutenace = { ...sout }
    let session = { ...sess }

    return this.http.get<any>(`${environment.backendUrl}soutenances/archive/${soutenace._id}/${session._id}`)

  }
  restorerSoutenance(sout, sess) {
    let soutenace = { ...sout }
    let session = { ...sess }

    return this.http.get<any>(`${environment.backendUrl}soutenances/restore/${soutenace._id}/${session._id}`)
  }
}
