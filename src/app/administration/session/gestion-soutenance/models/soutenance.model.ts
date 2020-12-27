export class Soutenance {
    public respInsat: string;
    public respEntreprise: string;

    public sujet: string;

    public Examinateur: string;

    public entreprise: string;

    public candidat: string;
    public heure: string;

    public isItPublic: boolean;
    constructor(
        respInsat: string,
        respEntreprise: string,
        sujet: string,
        Examinateur: string,
        entreprise: string,
        candidat: string,
        heure: string,
        isItPublic: boolean
    ) {
        this.respInsat = respInsat;
        this.respEntreprise = respEntreprise;
        this.sujet = sujet;
        this.Examinateur = Examinateur;
        this.entreprise = entreprise;
        this.candidat = candidat;
        this.isItPublic = isItPublic;
        this.heure = heure
    }
}
