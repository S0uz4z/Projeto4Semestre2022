//Imports 
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(express.json());

//Array que guardará temporariamente os itens.
const listaItens = []

//Endpoint para receber a requisição do tipo GET, e retornar todos os itens no inventário.
app.get('/inventario', (req, res) => {
    res.status(200).send(listaItens);
})