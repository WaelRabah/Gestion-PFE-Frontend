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
    this.sessionService.fetchSessions().subscribe( data => {
      this.sessionService.setSession(data);
      this.elements = this.sessionService.getSessions();
      console.log(this.elements)
    });

    this.sessionService.sessionChanged.subscribe( data => {
      this.elements = this.sessionService.getSessions();
    })

  }

  onClickSession(index: string){
    this.selectedSession= this.elements.find( element => element._id == index)
  }

  onNavigate(){
    this.route.navigate(["/Session/create"]);
    console.log("hello")
  }

}
