import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './session.model';
import { SessionService} from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  elements:Session[] = [];
  selectedSession: Session;
  headElements = ['#', 'Filiere', 'Date', 'Actions'];
  searchText: any = {}
  constructor( private sessionService: SessionService, private route:Router) { }

  ngOnInit(): void {
    this.sessionService.fetchSessions().subscribe( data  => {
      data.map( session => {
        session.date = session.date.slice(0,10);
      })
      this.sessionService.setSession(data);
      this.elements = this.sessionService.getSessions();
      console.log(this.elements)
    });

    this.sessionService.sessionChanged.subscribe( data => {
      this.elements = this.sessionService.getSessions();
    })

  }

  onClickSession(index: string){
    this.route.navigate(['/Session'])
    this.selectedSession= this.elements.find( element => element._id == index)
  }

  onNavigateCreate(){
    this.route.navigate(["/Session/create"]);
    console.log("hello")
  }

  onNavigateModif(index: string){
    let element = this.elements.find( element => element._id == index);
    this.route.navigate(['Session/modif',element._id])
  }
  onDelete(index: string){
    this.sessionService.deleteSession(index)
  }

}
