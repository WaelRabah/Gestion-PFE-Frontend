import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session} from './session.model'
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessions:Session[] = [];
  sessionChanged = new Subject<Session[]>();

  constructor(
    private http: HttpClient
  ) { }

  fetchSessions(){
    return this.http.get<Session[]>("http://localhost:3000/sessions");

  }

  getSessions(){
    return this.sessions.slice();
  }
  setSession(session:Session[]){
    this.sessions = session
  }

  storeSession(session: Session){
    return this.http.post("http://localhost:3000/sessions",session)
  }

  addSession(session: Session){
    this.sessions.push(session);
    this.sessionChanged.next(this.sessions.slice())
  }

}
