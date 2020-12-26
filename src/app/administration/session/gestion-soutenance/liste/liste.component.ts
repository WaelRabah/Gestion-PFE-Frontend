import { Component, OnInit } from '@angular/core';
import { Soutenance } from '../models/soutenance.model';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  soutenances: Soutenance[];
  selectedSoutenance: number = -1;
  constructor() { }
  setSelected(idx) {
    this.selectedSoutenance = idx
  }
  ngOnInit(): void {
    this.soutenances = new Array(10).fill({}).map(
      (val, index) => {
        const obj = new Soutenance(
          `respInsa${index}`,
          `respEnt${index}`,
          `sujet${index}`,
          `examinateur${index}`,
          `entreprise${index}`,
          `candidat${index}`,
          `${index}AM`,
          true
        )
        console.log(obj)
        return obj
      }
    );

  }
}
