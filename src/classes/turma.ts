export class Turma{
    private id:string = String(Date.now());
    private nome:string;
    private docentes:string[];
    private estudantes:string[];
    private modulo:string= "0";

    constructor(nome:string, docentes:string[], estudantes:string[]){
        this.nome= nome;
        this.docentes= docentes;
        this.estudantes= estudantes;
    };

    public get pegarId():string{
        return this.id;
    };

    public get pegarNome():string{
        return this.nome;
    };

    public get pegarModulo():string{
        return this.modulo;
    }
};





