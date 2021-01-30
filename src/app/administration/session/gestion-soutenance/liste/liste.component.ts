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
export class ListeComponent implements OnInit , OnChanges {
  constructor(private readonly _service: SoutenanceService) { }

  @Input()
  passedSoutenances: any[];



  originals: any[];
  selectedSoutenance: number = -1;
  soutenances: any[];
  private _sessionId: string;
  private _searchTerm: string = '';
  private _isItPublic: boolean = true;
  @Input()
  set sessionId(value: string) {
    if (value !== this._sessionId) {
      this._sessionId = value;
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

      this.soutenances = this.originals

    }
    else
    if (value !== this._searchTerm) {
      this._searchTerm = value;
   
      this.soutenances = this.originals.filter((item) => {
    
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
      })
      
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
      this.soutenances = this.originals.filter((item) => {
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
  ngOnChanges( changes : SimpleChanges){

 if (changes.passedSoutenances)
{    this.originals= changes.passedSoutenances
    .currentValue
    .map(item => {
      
      return {
        original : item , 
        displayable : {
          Examinateur: item.president.firstname + " " + item.president.lastname,
          candidat: item.student.firstname + " " + item.student.lastname,
          entreprise: item.pfe.entreprise,
          heure: item.heure,
          respEntreprise: item.pfe.nomEncadrantEntreprise,
          respInsat: item.pfe.enseignantsEncadrants.map(item => item.firstname + " " + item.lastname),
          sujet: item.pfe.titre,
          isItPublic: item.isItPublic
        }
      }
    })
    
    this.soutenances=[...this.originals.filter((item) => {
      const {
        isItPublic
      } = item.displayable;

      return (
        isItPublic === this._isItPublic
      );
    })]

  }
    
    

  }
  ngOnInit(): void {
   
    if (!this.passedSoutenances)
    return
    this.originals= this.passedSoutenances
      .map(item => {

        return {
          original : item , 
          displayable : {
            Examinateur: item.president.firstname + " " + item.president.lastname,
            candidat: item.student.firstname + " " + item.student.lastname,
            entreprise: item.pfe.entreprise,
            heure: item.heure,
            respEntreprise: item.pfe.nomEncadrantEntreprise,
            respInsat: item.pfe.enseignantsEncadrants.map(item => item.firstname + " " + item.lastname),
            sujet: item.pfe.titre,
            isItPublic: item.isItPublic
          }
        }
      })
     
     this.soutenances=[...this.originals.filter((item) => {
      const {
        isItPublic
      } = item.displayable;

      return (
        isItPublic === this._isItPublic
      );
    })];
    this.setSelected(0);
  }
}
