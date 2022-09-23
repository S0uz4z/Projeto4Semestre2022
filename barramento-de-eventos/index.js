//Imports 
import express from 'express';
import axios from 'axios';

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(express.json());

//Endpoint para receber requisição do tipo POST, e retornar requisições recebidas de outros microsserviços para os mesmos.
app.post('/eventos', async (req, res) => {
    
    //Criação de constante que recebe corpo da requisição.
    const evento = req.body;

    //TODO fazer testes com looping em portas para não haver repetição de código.
    //Método que envia requisição para microsserviço de inventário.
    await axios.post('http://localhost:4000/eventos', evento)
    res.status(201).send(
        `Evento registrado! \n
        
        Corpo da requisição:\n
        \n
        ${req.body}` );
})

console.log('Microsserviço de Barramento iniciado.')
app.listen(10000)