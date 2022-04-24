import { Request, Response } from "express"
import {Turma} from "../classes/turma";
import {createTables} from "../Data/migrations";
import connection from "../connection"; 

export const criarturma= async (req:Request, res: Response): Promise<void> => {
    let codeError: number= 400;
    
    try{
        const idDocentes: any= [];
        const idEstudantes: any= [];
        const {nome}= req.body;

        if(!nome){
            codeError= 422;
            throw new Error(`${nome? "Nome preenchido corretamente.\n": "Preencha corretamente o campo nome.\n"}`);

        }else if(nome){
            connection.raw(`
                SELECT * FROM Docente_Especialidade JOIN Docente ON docente_id = Docente.id JOIN Especialidade ON especialidade_id = Especialidade.id;
            `)
                .then(data => {
                    data[0].forEach((obj:any):void => {idDocentes.push(obj.id)});
                    
                    connection.raw(`
                        SELECT * FROM Estudante_Hobby JOIN Estudantes ON estudante_id = Estudantes.id JOIN Hobby ON hobby_id = Hobby.id;
                    `)
                        .then(async data => {
                            data[0].forEach((obj:any):void => {idEstudantes.push(obj.id)});

                            const novaTurma= new Turma(nome, idDocentes, idEstudantes);
                            await createTables();
                            
                            connection("Turma")
                                .insert([{"id": `${novaTurma.pegarId}`, "nome":`${novaTurma.pegarNome}`, "modulo": `${novaTurma.pegarModulo}`}])
                                .then(() => res.status(201).send("Turma criada com sucesso."))
                                .catch((error: any) => {
                                    codeError=422
                                    res.status(codeError).send(error.sqlMessage || error.message)
                                });                            
                        })
                        .catch((error: any) => {
                            codeError=422;
                            res.status(codeError).send(error.sqlMessage || error.message)
                        })
                })
                .catch((error: any) => {
                    codeError=422;
                    res.status(codeError).send(error.sqlMessage || error.message)
                })
        }else{
            codeError= 500;
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        };
    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    };
};