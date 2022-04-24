import { Request, Response } from "express";
import {Docente} from "../classes/docente";
import connection from "../connection";
import {createTables} from "../Data/migrations";

export const criarDocente= async (req:Request, res:Response): Promise<void> => {
    let codeError: number= 400;

    try{
        const {nome, email, data_nasc, especialidades}= req.body;
        const especialidadesId: string= String(Date.now()); 

        if(!nome || !email || !data_nasc || !especialidades.length ){
            codeError= 422;
            throw new Error(`${nome? "Nome preenchido corretamente.\n": "Preencha corretamente o campo nome.\n"} ${email? "Email preenchido corretamente.\n": "Preencha corretamente o campo email.\n"} ${data_nasc ? "Data_nasc preenchida corretamente.\n": "Preencha corretamente o campo data_nasc.\n"}${especialidades.length? "Especialidades preenchidas corretamente.\n": "Preencha corretamente o campo Especialidades.\n"}`);

        }else if(nome && email && data_nasc && especialidades.length){
            const stringsMinusculas: string[]= especialidades.map((item:string): string => item.toLowerCase());
            const especialidadesFixas: string[]= ["JS", "CSS", "React", "Typescript", "POO"]
                .filter((item:string): boolean => stringsMinusculas.includes(item.toLowerCase()));
            
            if(especialidadesFixas.length){
                const novoDocente= new Docente(nome, email, data_nasc, especialidades);
                await createTables();
            
                connection("Docente")
                    .insert([{"id": `${novoDocente.pegarId}`, "nome":`${novoDocente.pegarNome}`, "email": `${novoDocente.pegarEmail}`,"data_nasc":`${novoDocente.pegarDataNasc}`, "turma_id":`${novoDocente.pegarTurmaId}`}])
                    .then(() => res.status(201).send("Docente criado com sucesso."))
                    .catch((error: any) => {
                        codeError=422
                        res.status(codeError).send(error.sqlMessage || error.message)
                    });

                connection("Especialidade")
                    .insert([{"id": `${especialidadesId}`, "name":`${novoDocente.pegarEspecialidades.join()}`}])
                    .then(() => console.log("Especialidade criada com sucesso."))
                    .catch((error: any) => {
                        codeError=422
                        res.status(codeError).send(error.sqlMessage || error.message)
                    });

                connection("Docente_Especialidade")
                    .insert([{"id": `${String(Date.now())}`, "docente_id":`${novoDocente.pegarId}`,     "especialidade_id": `${especialidadesId}`}])
                    .then(() => console.log("Docente_Especialidade criada com sucesso."))
                    .catch((error: any) => {
                        codeError=422
                        res.status(codeError).send(error.sqlMessage || error.message)
                    });
            }else{
                res.status(422).send(`Deve iniciar com pelo menos uma das especialidades fixas. Exemplo: JS, CSS, React, Typescript, POO.`);
            }
            
        }else{
            codeError= 500;
            throw new Error("Ocorreu um erro. Tente novamente mais tarde.");
        };

    }catch(error:any){
        res.status(codeError).send(error.message || error.sqlMessage);
    };
}