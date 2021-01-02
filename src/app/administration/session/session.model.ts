export class Session {
  public _id: string;
  public numero: string;
  public date: string;
  public president: string;
  public presidentId: string;
  public filiere: string;


  constructor(_id: string, numero: string, date: string, president: string, presidentId: string, filiere: string) {
    this._id = _id;
    this.numero = numero;
    this.date = date;
    this.president = president;
    this.presidentId = presidentId;
    this.filiere = filiere;
  }

}
