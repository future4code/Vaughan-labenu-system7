import {Request, Response} from "express";
import connection from "../connection";

export const pegarEstudante= async (req: Request, res: Response): Promise<void> => {
    let codeError: number= 400;

    try{
        const nome: string= req.body.nome; 

        connection.raw(`
            SELECT * FROM Estudante_Hobby JOIN Estudantes ON estudante_id = Estudantes.id JOIN Hobby ON hobby_id = Hobby.id WHERE nome = "${nome}";
        `)
            
            .then(data => {
                if(!data[0].length){
                    codeError= 422;
                    throw new Error("Não há aluno cadastrado com esse nome.");

                }else if(data[0].length){
                    const {id, nome, email, data_nasc, turma_id, name:hobby}= data[0][0];
                    
                    const dataNascimento= new Date(data_nasc);
                    const ano= dataNascimento.getFullYear();
                    const mes= (dataNascimento.getMonth() + 1) < 10?`0${dataNascimento.getMonth() + 1}`:dataNascimento.getMonth() + 1;
                    const dia= dataNascimento.getDate() < 10?`0${dataNascimento.getDate()}`: dataNascimento.getDate();

                    res.status(200).send({id, nome, email, data_nasc:`${dia}/${mes}/${ano}`, turma_id, hobby:hobby.split(",")});
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