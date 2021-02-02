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

      this.filter()

    }
    else
    if (value !== this._searchTerm) {
      this._searchTerm = value;
   
      this.filter()
      
    }

  }
  get searchTerm(): string {
    return this._searchTerm;
  }
  @Input()
  set isItPublic(value: boolean) {

    this._isItPublic=value
    this.filter()


  }
  get isItPublic(): boolean {
    return this._isItPublic;
  }
  setSelected(idx) {
    this.selectedSoutenance = idx;
  }
  filter(){
    this.selectedSoutenance = -1;
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
        Examinateur.includes(this._searchTerm) ||
        candidat.includes(this._searchTerm) ||
        entreprise.includes(this._searchTerm) ||
        heure.includes(this._searchTerm) ||
        respEntreprise.includes(this._searchTerm) ||
        respInsat.includes(this._searchTerm) ||
        sujet.includes(this._searchTerm)
      );
    })
    
    if (this.soutenances) {
    
      this.soutenances = this.soutenances.filter((item) => {
        const {
          isItPublic
        } = item.displayable;

        return (
          isItPublic === this._isItPublic
        );
      });
    }
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
