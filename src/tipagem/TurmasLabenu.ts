export interface TurmasLabenu{
    id: string,
    nome: string,
    modulo: number,
};

export interface LabenuDocentes{
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string,
    especialidades:string[]
}