import { Component, Input, OnInit } from '@angular/core';
import { Soutenance } from '../models/soutenance.model'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() index: number
  @Input() selectedSoutenance: number
  @Input() item: Soutenance
  constructor() { }

  ngOnInit(): void {
  }

}
