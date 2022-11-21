//Imports 
import express from 'express';
import axios from 'axios';
import mysql from 'mysql'
import { v4 as uuidv4 } from 'uuid';

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(express.json());

//Informações do Banco
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
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

//Endpoint para receber requisição do tipo POST, e retornar requisições recebidas de outros microsserviços para os mesmos.
app.post('/eventos', async (req, res) => {
    

    //Criação de constante que recebe corpo da requisição.
    const evento = req.body.evento;

    //Criação do uuidv4
    let idEvento = uuidv4();

    con.query(`INSERT INTO eventos (id, descric, dataHora) VALUES ('${idEvento}', '${evento}', current_timestamp())`, async (err) => {
        console.log(err)
        //Método que envia requisição para microsserviço de inventário.
        await axios.post('http://localhost:4000/eventos', evento)
        res.status(201).send(
            `Evento registrado! \n
        
        Corpo da requisição:\n
        \n
        ${req.body}`);
    })
})

console.log('Microsserviço de Barramento iniciado.')
app.listen(10000)