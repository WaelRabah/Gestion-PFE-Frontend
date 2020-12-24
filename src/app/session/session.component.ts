import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  elements: any = [
    {numero: 1, filiere: 'GL', date: '2018-01-01' },
    {numero: 2, filiere: 'GL', date: '2018-01-01' },
    {numero: 3, filiere: 'IMI', date: '2018-01-01' },
    {numero: 4, filiere: 'IIA', date: '2018-01-01' },
    {numero: 5, filiere: 'RT', date: '2018-01-01'},
  ];
  headElements = ['Numero', 'Filiere', 'Date', 'Actions'];
  searchText: any = {}
  constructor() { }

  ngOnInit(): void {
  }

}
