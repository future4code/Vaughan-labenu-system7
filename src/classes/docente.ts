export class Docente{
    private id:string = String(Date.now());
    private nome:string;
    private email:string;
    private data_nasc:string;
    private turma_id:string= "1650795821764";
    private especialidades:string[];

    constructor(nome:string, email:string, data_nasc:string, especialidades:string[]){
        this.nome= nome;
        this.email=email;
        this.data_nasc=data_nasc;
        this.especialidades= especialidades;
    };

    public get pegarId():string{
        return this.id;
    };

    public get pegarNome():string{
        return this.nome;
    };

    public get pegarEmail():string{
        return this.email;
    };

    public get pegarDataNasc():string{
        const [dia, mes, ano]=this.data_nasc.split("/");

        return `${ano}-${mes}-${dia}`;
    };

    public get pegarTurmaId():string{
        return this.turma_id;
    };

    public get pegarEspecialidades():string[]{
        return this.especialidades;
    };
};