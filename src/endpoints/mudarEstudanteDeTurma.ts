import { Request, Response } from 'express';
import connection from '../connection';

export const mudarEstudanteDeTurma= async (req: Request, res: Response): Promise<void> => {
    let codeError: number= 400;
    try{
        const turma_id= req.body.turma_id;
        const nome= req.body.nome;

        if(!turma_id || !nome){
            codeError= 422;
            throw new Error(`${turma_id?"Campo turma_id preenchido corretamnete.\n":"Campo turma_id está preenchido incorretamente.\n"}${nome?"Campo nome preenchido corretamnete.\n":"Campo nome preenchido incorretamente.\n"}`);

        }else if(turma_id && nome){

            connection("Estudantes")
                .update({turma_id})
                .where({nome})
                .then(() => res.status(200).send({message:"Turma atualizada com sucesso!"}))
                .catch(() => res.status(422).send({message:"Não foi possível atualizar a turma."}));
        }else{
            codeError= 500;
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        };

    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    }
}