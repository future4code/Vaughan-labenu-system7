import { Request, Response } from "express";
import connection from "../connection";
import {LabenuDocentes} from "../tipagem/TurmasLabenu";

export const pegarDocentes= async (req: Request, res: Response): Promise<void> => {
    let codeError: number= 400;

    try{
        connection.raw(`
            SELECT * FROM Docente_Especialidade JOIN Docente ON docente_id = Docente.id JOIN Especialidade ON especialidade_id = Especialidade.id;
        `)
            
            .then(data => {
                if(!data[0].length){
                    codeError= 422;
                    throw new Error("Não há docente cadastrado.");

                }else if(data[0].length){
                    
                    const dadosDocentes: LabenuDocentes[]= data[0].map((obj:any):LabenuDocentes => {
                        const dataNascimento= new Date(obj.data_nasc);
                        const ano= dataNascimento.getFullYear();
                        const mes= (dataNascimento.getMonth() + 1) < 10?`0${dataNascimento.getMonth() + 1}`:dataNascimento.getMonth() + 1;
                        const dia= dataNascimento.getDate() < 10?`0${dataNascimento.getDate()}`: dataNascimento.getDate();

                        const especDocente= obj.name.split(",");

                        return {
                            id:obj.id,
                            nome:obj.nome,
                            email:obj.email,
                            data_nasc:`${dia}/${mes}/${ano}`,
                            turma_id:obj.turma_id,
                            especialidades:especDocente
                        }
                    });

                    res.status(200).send(dadosDocentes);
                }else{
                    codeError= 500;
                    throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
                };
            })
            .catch(error => res.status(codeError).send(error.message || error.sqlMessage))

    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    }
}