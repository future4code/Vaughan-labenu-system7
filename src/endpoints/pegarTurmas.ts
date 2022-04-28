import {Request, Response} from "express";
import connection from "../connection";
import {TurmasLabenu} from "../tipagem/TurmasLabenu";

export const pegarTurmas= async (req: Request, res:Response): Promise<void> => {
    let codeError: number= 400;

    try{
        connection("Turma")
            .then(data => {
                const turmasAtivas= data.filter((obj:TurmasLabenu):boolean => +obj.modulo !== 0);
                
                if(!data.length){
                    codeError= 422;
                    throw new Error("Não há turmas cadastradas.");

                }else if(!turmasAtivas.length){
                    codeError= 422;
                    throw new Error("Não há turmas ativas.");

                }else if(turmasAtivas.length){
                    res.status(200).send(turmasAtivas);

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