//Imports 
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import mysql from 'mysql';
import cors from 'cors';

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
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

//Endpoint para receber a requisição do tipo GET, e retornar todos os itens no inventário.
app.get('/inventario', (req, res) => {
    let items = []
    con.query('select * from itens', async (err, result) => {
        items = {
            msg: 'Itens encontrados com sucesso!',
            evento: 'Busca de Item',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send(items);
        } catch (err) {
            res.status(500).send({
                msg:"Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo POST, e retornar dados vindos do barramento de eventos.
app.post('/eventos', (req, res) => {
    res.status(200).send(req.body)
})

//Endpoint para receber a requisição do tipo POST, cadastrar um novo item, e retornar mensagem de status do cadastro.
app.post('/inventario', async (req, res) => {

    //Atribui json no corpo da requisição a uma variavel.
    let dados = req.body;

    //Cria objeto.
    const novoItem = {}

    //Map que cria uma chave e valor com dados vindos do objeto da requisição.
    Object.entries(dados).map(entries => {
        novoItem[entries[0]] = entries[1];
    })

    //Método que envia requisição para microsserviço de barramento de eventos.
    con.query(`INSERT INTO itens (nome, quantidade) VALUES ("${novoItem.nomeItem}", ${novoItem.qtdItem})`, async (err, result) => {

        let items = {
            msg: 'Item craido com sucesso!',
            evento: 'Criação de Item',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send({
                msg: "Item criado com sucesso",
                item: novoItem
            });
        } catch (err) {
            res.status(500).send({
                msg:"Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo DELETE, excluir um item e retornar mensagem de status da exclusão.
app.put('/inventario/:id', (req, res) => {

    //Atribui id vindo da URL da requisição a uma variável.
    let idItem = req.params.id;

    let infoItem = req.body;

    con.query(`UPDATE itens SET nome = '${infoItem.nome}', quantidade = ${infoItem.qtd} WHERE id = ${idItem}`, async (err, result) => {
        let items = {
            msg: 'Item editado com sucesso!',
            evento: 'Edição de Item',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send({
                msg: "Item deletado com sucesso"
            });
        } catch (err) {
            res.status(500).send({
                msg:"Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

//Endpoint para receber a requisição do tipo DELETE, excluir um item e retornar mensagem de status da exclusão.
app.delete('/inventario/:id', (req, res) => {

    //Atribui id vindo da URL da requisição a uma variável.
    let idItem = req.params.id;

    con.query(`delete from itens where id = ${idItem}`, async (err, result) => {
        console.log(err)
        let items = {
            msg: 'Item deletado com sucesso!',
            evento: 'Delete de Item',
            result
        }
        try {
            await axios.post('http://localhost:10000/eventos', items)
            res.status(200).send({
                msg: "Item deletado com sucesso"
            });
        } catch (err) {
            res.status(500).send({
                msg:"Erro ao se conectar com barramento de eventos."
            });
        }
    })
})

console.log('Microsserviço de Inventário iniciado.')
app.listen(4000)