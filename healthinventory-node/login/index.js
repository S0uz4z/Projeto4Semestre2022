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

app.post('/login', (req, res) => {
    let infoUsuario = req.body;
    let usuariosBanco;
    try { 
        con.query(`select * from usuarios where usuario = '${infoUsuario.usuario}' and senha = '${infoUsuario.senha}'`, (err, result) => {
            if (!err) {
                if (result.length > 0) {
                    usuariosBanco = result[0]
                    res.status(200).send({ message: 'Usuário encontrado com sucesso!', usuario: usuariosBanco })
                } else { 
                    res.status(404).send({ message: 'Usuário não foi encontrado.' })
                }
            } else { 
                throw Error
            }
        })
    }
    catch (err) {
        res.status(404).send({ message: 'Houve um erro ao realizar o login.' })
     }
})

console.log('Microsserviço de Login iniciado.')
app.listen(7000)