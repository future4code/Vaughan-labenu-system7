import connection from "../connection";

export const printError = (error: any) => console.log(error.sqlMessage || error.message);

export const createTables = () => connection
    .raw(`
        CREATE TABLE IF NOT EXISTS Turma (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            modulo VARCHAR(255) DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS Estudantes (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            data_nasc DATE NOT NULL,
            turma_id VARCHAR(255),
            FOREIGN KEY(turma_id) REFERENCES Turma(id)
        );

        CREATE TABLE IF NOT EXISTS Hobby (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS Estudante_Hobby (
            id VARCHAR(255) PRIMARY KEY,
            estudante_id VARCHAR(255) NOT NULL,
            hobby_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(estudante_id) REFERENCES Estudantes(id),
            FOREIGN KEY(hobby_id) REFERENCES Hobby(id)
        );

        CREATE TABLE IF NOT EXISTS Docente (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            data_nasc DATE NOT NULL,
            turma_id VARCHAR(255),
            FOREIGN KEY(turma_id) REFERENCES Turma(id)
        );

        CREATE TABLE IF NOT EXISTS Especialidade (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS Docente_Especialidade (
            id VARCHAR(255) PRIMARY KEY,
            docente_id VARCHAR(255) NOT NULL,
            especialidade_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(docente_id) REFERENCES Docente(id),
            FOREIGN KEY(especialidade_id) REFERENCES Especialidade(id)
        );
`)
    .then(() => console.log("Tabela criada"))
    .catch(printError)

//turma_id VARCHAR(255),
//FOREIGN KEY(turma_id) REFERENCES Turma(id) 