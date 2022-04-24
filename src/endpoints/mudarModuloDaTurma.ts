import {Request, Response} from "express";
import connection from "../connection";

export const mudarModuloDaTurma= async (req:Request, res:Response): Promise<void> => {
    let codeError: number= 400;
    try{
        const modulo= req.body.modulo;
        const nome= req.body.nomeDaTurma;

        if(!modulo || !nome){
            codeError= 422;
            throw new Error(`${modulo?"O campo modulo preenchido corretamnete.\n":"O campo modulo está vazio, preencha com um valor.\n"}${nome?"O campo nomeDaTurma preenchido corretamnete.\n":"O campo nomeDaTurma está vazio, preencha com um valor.\n"}`);

        }else if(modulo && nome){

            connection("Turma")
                .update({modulo})
                .where({nome})
                .then(() => res.status(200).send({message:"Modulo atualizado com sucesso!"}))
                .catch(() => res.status(422).send({message:"Não foi possível atualizar o modulo."}));
        }else{
            codeError= 500;
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        };

    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    }
}