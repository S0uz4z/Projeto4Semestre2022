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

    //Cria objeto.
    const novoUser = {}

    //Map que cria uma chave e valor com dados vindos do objeto da requisição.
    Object.entries(dados).map(entries => {
        novoUser[entries[0]] = entries[1];
    })

    //Método que envia requisição para microsserviço de barramento de eventos.
    con.query(`INSERT INTO usuarios (usuario, senha, tipo) VALUES ("${dados.usuarioUser}", "${dados.senhaUser}", "${dados.tipoUser}")`, async (err, result) => {

        let userMsg = {
            msg: 'Item criado com sucesso!',
            evento: 'Criação de usuario',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', userMsg)
            res.status(200).send({
                msg: "Usuario criado com sucesso",
                item: novoUser
            });
        } catch (err) {
            res.status(500).send({
                msg: "Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo PUT, editar um usuario e retornar mensagem de status da edição.
app.put('/usuarios/:id', (req, res) => {

    //Atribui id vindo da URL da requisição a uma variável.
    let userId = req.params.id;
    
    let infoItem = req.body;

    con.query(`UPDATE usuarios SET usuario = '${infoItem.userUsuario}', senha = ${infoItem.userSenha} WHERE id = ${userId}`, async (err, result) => {
        console.log(err)
        let usersMsg = {
            msg: 'Usuário editado com sucesso!',
            evento: 'Edição de Usuario',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', usersMsg)
            res.status(200).send({
                msg: "Usuario editado com sucesso"
            });
        } catch (err) {
            res.status(500).send({
                msg: "Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo DELETE, excluir um item e retornar mensagem de status da exclusão.
app.delete('/usuarios/:id', (req, res) => {

    //Atribui id vindo da URL da requisição a uma variável.
    let userId = req.params.id;

    con.query(`delete from usuarios where id = ${userId}`, async (err, result) => {
        console.log(err)
        let items = {
            msg: 'Usuario deletado com sucesso!',
            evento: 'Delete de usuario',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send({
                msg: "Usuario deletado com sucesso"
            });
        } catch (err) {
            res.status(500).send({
                msg: "Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

app.listen(9000)