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

  getSessionById(index:string) {
    return this.sessions.find( element => element._id == index);
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
  deleteSession(index:string){
    this.http.delete("http://localhost:3000/sessions/"+index).subscribe( response => {
      this.sessions = this.sessions.filter( element => element._id != index);
      this.sessionChanged.next(this.sessions.slice())
    })
  }

  UpdateSession(doc, index:string) {
    let update = {
      numero: doc.value.numero.toString(),
      filiere: doc.value.filiere,
      president: doc.value.president,
      date : doc.value.date
    }
    return this.http.put("http://localhost:3000/sessions/"+index,update).subscribe((data:Session) => {
      let idx = this.sessions.indexOf(this.getSessionById(index))
      console.log(data)
      this.sessions[idx]= data
      this.sessionChanged.next(this.sessions.slice())
    })
  }



}
