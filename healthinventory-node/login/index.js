//Imports 
import express from 'express';
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(cors())
app.use(express.json());

const usuariosBanco = [{
    id: '8ad17d7e-98ad-4a78-b5b3-1b175c162108',
    email: 'usuarioteste@test.com',
    usuario: 'teste',
    senha: '123',
    tipo: 'admin'
}]

app.post('/login', (req, res) => {
    let infoUsuario = req.body;
    let usuarioAutenticado = usuariosBanco.filter((usuarioBanco) => { return usuarioBanco.usuario == infoUsuario.usuario && usuarioBanco.senha == infoUsuario.senha })
    if (usuarioAutenticado.length > 0) {
        res.status(200).send({message: 'Usuário encontrado com sucesso!', usuario: usuarioAutenticado[0]})
    } else {
        res.status(404).send({message: 'Usuário não foi encontrado'})
    }
    
})

console.log('Microsserviço de Login iniciado.')
app.listen(7000)