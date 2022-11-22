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

//Endpoint para receber a requisição do tipo GET, e retornar todos os usuarios.
app.get('/usuarios', (req, res) => {
    let users = []
    con.query('select * from usuarios', async (err, result) => {
        users = {
            msg: 'Usuarios encontrados com sucesso!',
            evento: 'Busca de Usuarios',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', users)
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send({
                msg: "Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo POST, cadastrar um novo item, e retornar mensagem de status do cadastro.
app.post('/usuarios', async (req, res) => {

    //Atribui json no corpo da requisição a uma variavel.
    let dados = req.body;

    //Map que cria uma chave e valor com dados vindos do objeto da requisição.
    Object.entries(dados).map(entries => {
        novoUsuario[entries[0]] = entries[1];
    })

    //Método que envia requisição para microsserviço de barramento de eventos.
    con.query(`INSERT INTO usuarios (nome, usuario, senha, tipo) VALUES ("${dados.nomeUser}", ${dados.usuarioUser}, ${dados.senhaUser})`, async (err, result) => {

        let items = {
            msg: 'Item criado com sucesso!',
            evento: 'Criação de usuario',
            result
        }
        console.log(items)
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send({
                msg: "Usuario criado com sucesso",
                item: novoItem
            });
        } catch (err) {
            res.status(500).send({
                msg: "Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

app.listen(9000)