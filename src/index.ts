import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import {criarturma} from "./endpoints/criarTurma";
import {pegarTurmas} from "./endpoints/pegarTurmas";
import {mudarModuloDaTurma} from "./endpoints/mudarModuloDaTurma";
import {criarEstudante} from "./endpoints/criarEstudante";
import {pegarEstudante} from "./endpoints/pegarEstudante";
import {mudarEstudanteDeTurma} from "./endpoints/mudarEstudanteDeTurma";
import {criarDocente} from "./endpoints/criarDocente";
import {pegarDocentes} from "./endpoints/pegarDocentes";
import {mudarDocenteDeTurma} from "./endpoints/mudarDocenteDeTurma";

const app: Express = express();
app.use(express.json());
app.use(cors());

// -=-=-= TURMA -=-=-=-=-
// Criar turma;
app.post("/criarturma", criarturma);

// Buscar turmas;
app.get("/", pegarTurmas);

// Mudar turma de módulo;
app.put("/turma/modulo", mudarModuloDaTurma);

//=============================================

// -=-=-= ESTUDANTES -=-=-=-=-
//Criar estudante;
app.post("/criarestudante", criarEstudante);

//Buscar estudantes através do nome;
app.get("/estudante", pegarEstudante);

//Mudar estudante de turma;
app.put("/estudante/turma", mudarEstudanteDeTurma);

//=============================================

// -=-=-= DOCENTES -=-=-=-=-
//Criar docente;
app.post("/criardocente", criarDocente);

//Buscar todas as pessoas docentes;
app.get("/docente", pegarDocentes);

//  Mudar docente de turma;
app.put("/docente/turma", mudarDocenteDeTurma);


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});