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

//Endpoint para receber a requisição do tipo POST, cadastrar um novo item, e retornar mensagem de status do cadastro.
app.post('/inventario', (req, res) => {

    //Atribui json no corpo da requisição a uma variavel.
    let dados = req.body.item;

    //Gera um uuid que será atribuído ao novo item.
    let itemId = uuidv4();

    //Cria objeto com uuid gerado.
    const novoItem = { id: itemId }

    //Map que cria uma chave e valor com dados vindos do objeto da requisição.
    Object.entries(dados).map(entries => {
        novoItem[entries[0]] = entries[1];
    })

    //Acrescenta o novo item ao array de itens.
    listaItens.push(novoItem);

    //Retorna status 201 de registro criado e retorna json com mensagem e o item criado.
    res.status(201).send({
        msg: "Item criado com sucesso",
        item: novoItem
    });
})