import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Session } from '../../session.model';
import { Soutenance } from '../models/soutenance.model';
import { SoutenanceService } from '../services/soutenance.service';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  constructor(private readonly _service: SoutenanceService) { }
  fetchedSoutenances: any[];
  soutenances: any[];
  selectedSoutenance: number = -1;

  private _sessionId: string;
  private _searchTerm: string = '';
  private _isItPublic: boolean = true;
  @Input()
  set sessionId(value: string) {
    if (value !== this._sessionId) {
      this._sessionId = value;
      this._service.getSoutenancesBySessionId(value).subscribe((data) => {
        this.fetchedSoutenances = data;
        this.soutenances = data;
      });
      this.selectedSoutenance = -1;
    }
  }

  get sessionId(): string {
    return this._sessionId;
  }
  @Input() selectedSession: Session;

  @Input()
  set searchTerm(value: string) {
    this.selectedSoutenance = -1;
    if (value === "") {

      this.soutenances = this.fetchedSoutenances

    }
    if (value !== this._searchTerm) {
      this._searchTerm = value;
      this.soutenances = this.soutenances.filter((item) => {
        const {
          Examinateur,
          candidat,
          entreprise,
          heure,
          respEntreprise,
          respInsat,
          sujet,
        } = item.displayable;

        return (
          Examinateur.includes(value) ||
          candidat.includes(value) ||
          entreprise.includes(value) ||
          heure.includes(value) ||
          respEntreprise.includes(value) ||
          respInsat.includes(value) ||
          sujet.includes(value)
        );
      });
    }
  }
  get searchTerm(): string {
    return this._searchTerm;
  }
  @Input()
  set isItPublic(value: boolean) {
    this.selectedSoutenance = -1;
    if (this.soutenances) {
      this._isItPublic = !this._isItPublic;
      this.soutenances = this.fetchedSoutenances.filter((item) => {
        const {
          isItPublic
        } = item.displayable;

        return (
          isItPublic === this._isItPublic
        );
      });
    }




  }
  get isItPublic(): boolean {
    return this._isItPublic;
  }
  setSelected(idx) {
    this.selectedSoutenance = idx;
  }
  ngOnInit(): void { }
}
