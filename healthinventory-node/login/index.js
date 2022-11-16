//Imports 
import express from 'express';
import cors from 'cors'
import mysql from 'mysql'
// import config from ''

//Criação do objeto que gerencia os métodos para crirmos os endpoints.
const app = express();

//Adição de um body parser para json.
app.use(cors())
app.use(express.json());

//Mysql connection
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

const usuariosBanco = [{
    id: '8ad17d7e-98ad-4a78-b5b3-1b175c162108',
    email: 'usuarioteste@test.com',
    usuario: 'teste',
    senha: '123',
    tipo: 'admin'
},
{
    id: '8ad17d7e-98ad-4a78-b5b3-1b175c162109',
    email: 'usuarioteste@test.com',
    usuario: 'teste2',
    senha: '123',
    tipo: 'user'
}]

con.query("SELECT * FROM usuarios", function (err, result, fields) {
    if (!err)
        console.log(result);
});

app.post('/login', (req, res) => {
    let infoUsuario = req.body;
    let usuariosBanco = con.query(`select * from usuarios where usuario = ${infoUsuario.usuario} and senha = ${infoUsuario.senha}`)
    console.log(usuariosBanco)
    // let usuarioAutenticado = usuariosBanco.filter((usuarioBanco) => { return usuarioBanco.usuario == infoUsuario.usuario && usuarioBanco.senha == infoUsuario.senha })
    // let usuarioAutenticado = usuariosBanco.filter((usuarioBanco) => { return usuarioBanco.usuario == infoUsuario.usuario && usuarioBanco.senha == infoUsuario.senha })
    // if (usuarioAutenticado.length > 0) {
    //     res.status(200).send({ message: 'Usuário encontrado com sucesso!', usuario: usuarioAutenticado[0] })
    // } else {
    //     res.status(404).send({ message: 'Usuário não foi encontrado' })
    // }

})

console.log('Microsserviço de Login iniciado.')
app.listen(7000)