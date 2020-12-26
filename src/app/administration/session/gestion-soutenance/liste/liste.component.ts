import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Session } from '../../session.model';
import { Soutenance } from '../models/soutenance.model';
import {SoutenanceService} from '../services/soutenance.service'
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit , OnChanges {
  soutenances: any[];
  selectedSoutenance: number = -1;
  @Input() sessionId : string ;
  @Input() selectedSession: Session
  constructor(private readonly _service : SoutenanceService) { }
  setSelected(idx) {
    this.selectedSoutenance = idx
  }
  ngOnInit(): void {


  
  }
  ngOnChanges(changes : SimpleChanges) : void{
    if (changes.sessionId.currentValue !==changes.sessionId.previousValue)
    {
      this._service.getSoutenancesBySessionId(this.sessionId).subscribe((data)=>{
        this.soutenances=data
      })
      this.selectedSoutenance=-1
    }

  }
}
