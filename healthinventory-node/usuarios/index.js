//Imports 
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import mysql from 'mysql';
import cors from 'cors';

//Criação do objeto que gerencia os métodos para criarmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(express.json());
app.use(cors())

//Informações do Banco
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Usuario10.",
    database: "healthinventory"
})

con.connect(function (err) {
    if (!err) {
        console.log("Connected!");
    } else {
        console.log("Error to connect")
        console.log(err)
    }
})