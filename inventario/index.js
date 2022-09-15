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

//Endpoint para receber a requisição do tipo PUT, alterar um item e retornar mensagem de status da edição.
app.put('/inventario/:id', (req, res) => {

    //Atribui id vindo da URL da requisição a uma variável.
    let idItem = req.params.id;

    //Gera objeto com dados vindo do json do corpo da requisição.
    const dados = req.body.item;

    //Gera array com as chaves do objeto Dados.
    let chavesItem = Object.keys(dados)

    //Filtra array com itens e encontra o item com o id vindo da URL.
    let item = listaItens.filter(itemFiltrado => {
        return itemFiltrado.id === idItem;
    })

    //Map que, para cada chave, atribui o valor dos dados com a chave respectiva.
    chavesItem.map(chave => {
        item[0][chave] = dados[chave]
    })

    //Retorna o status da requisição, junto com a mensagem e o item editado.
    res.status(200).send({
        msg: "Item alterado com sucesso",
        item: item[0]
    });
})

console.log('Microsserviço de Inventário iniciado.')
app.listen(4000)