export class Session {
  public _id: string;
  public numero: string;
  public date: string;
  public president: any;
  public soutenances : []
  public filiere: string;


  constructor(_id: string, numero: string, date: string, president: {}, filiere: string,soutenances : []) {
    this._id = _id;
    this.numero = numero;
    this.date = date;
    this.president = president;
    this.soutenances=soutenances
    this.filiere = filiere;
  }

}
