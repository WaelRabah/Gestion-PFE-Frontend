import { HttpClient  } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from './session.model'
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  fetchSessions() {
    return this.http.get<Session[]>(environment.backendUrl + "sessions");

  }
  fetchSessionById(id: string) {
    return this.http.get<Session>(`${environment.backendUrl}sessions/${id}`);

  }
 

  storeSession(session: Session) {
    return this.http.post(environment.backendUrl + "sessions", session)
  }


  archiveSession(index: string) {
    return this.http.get(`${environment.backendUrl}sessions/archive/${index}`);
  }

  UpdateSession(doc, index: string) {
    let update = {
      numero: doc.numero.toString(),
      filiere: doc.filiere,
      president: doc.president,
      date: doc.date
    }
    this.http.put(environment.backendUrl+'sessions/' + index, update).subscribe((data: Session) => {
      data.date = data.date.slice(0, 10);
    })
  }

  downloadPDF(id: string){
    return this.http.get<Blob>(`${environment.backendUrl}sessions/pdf/${id}`);
}

}
