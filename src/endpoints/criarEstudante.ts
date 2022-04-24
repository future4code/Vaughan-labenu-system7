import {Request, Response} from "express";
import {createTables} from "../Data/migrations";
import connection from "../connection"; 
import {Estudantes} from "../classes/estudante";

export const criarEstudante= async (req: Request, res:Response): Promise<void> => {
    let codeError: number= 400;

    try{
        const {nome, email, data_nasc, hobbies}= req.body;
        const hobbyId: string= String(Date.now()); 

        if(!nome || !email || !data_nasc || !hobbies.length ){
            codeError= 422;
            throw new Error(`${nome? "Nome preenchido corretamente.\n": "Preencha corretamente o campo nome.\n"} ${email? "Email preenchido corretamente.\n": "Preencha corretamente o campo email.\n"} ${data_nasc ? "Data preenchida corretamente.\n": "Preencha corretamente o campo Data.\n"}${hobbies.length? "Hobbies preenchidos corretamente.\n": "Preencha corretamente o campo hobbies.\n"}`);

        }else if(nome && email && data_nasc && hobbies.length){
            const novoEstudante= new Estudantes(nome, email, data_nasc, hobbies);
            await createTables();

            connection("Estudantes")
                .insert([{"id": `${novoEstudante.pegarId}`, "nome":`${novoEstudante.pegarNome}`, "email": `${novoEstudante.pegarEmail}`,"data_nasc":`${novoEstudante.pegarDataNasc}`, "turma_id":`${novoEstudante.pegarTurmaId}`}])
                .then(() => res.status(201).send("Estudante criado com sucesso."))
                .catch((error: any) => {
                    codeError=422
                    res.status(codeError).send(error.sqlMessage || error.message)
                });

            connection("Hobby")
                .insert([{"id": `${hobbyId}`, "name":`${novoEstudante.pegarHobbies.join()}`}])
                .then(() => console.log("Hobby criado com sucesso."))
                .catch((error: any) => {
                    codeError=422
                    res.status(codeError).send(error.sqlMessage || error.message)
                });

            connection("Estudante_Hobby")
                .insert([{"id": `${String(Date.now())}`, "estudante_id":`${novoEstudante.pegarId}`, "hobby_id": `${hobbyId}`}])
                .then(() => console.log("Estudante_Hobby criado com sucesso."))
                .catch((error: any) => {
                    codeError=422
                    res.status(codeError).send(error.sqlMessage || error.message)
                });
        }else{
            codeError= 500;
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        };

    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    };
}