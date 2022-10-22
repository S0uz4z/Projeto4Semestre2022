import Button from '../components/Button'
import InputText from '../components/InputText'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function entrar() {
    let usuario = document.getElementById('usuario') as HTMLInputElement
    let senha = document.getElementById('senha') as HTMLInputElement
    
    var data = JSON.stringify({
        "usuario": usuario.value,
        "senha": senha.value
    });

    var config = {
        method: 'post',
        url: 'http://localhost:7000/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default function Login() {
    const navigate = useNavigate();

    function entrar() {
        let usuario = document.getElementById('usuario') as HTMLInputElement
        let senha = document.getElementById('senha') as HTMLInputElement

        var data = JSON.stringify({
            "usuario": usuario.value,
            "senha": senha.value
        });

        var config = {
            method: 'post',
            url: 'http://localhost:7000/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                navigate('/index')
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            });
    }
    return (
        <div className="App flex">
            <div className="w-[40%] h-screen flex flex-col bg-[#10543c]">
                <div className="w-[40%] m-auto text-white text-center flex flex-col">
                    <i className="fa-solid fa-clipboard text-9xl py-3"></i>
                    <span>HEALTHINVENTORY</span>
                </div>
            </div>
            <div className="w-[60%] bg-white flex">
                <div className="m-auto text-center">
                    <span className="font-extrabold text-5xl text-[#10543c] block mb-12">Login</span>
                    <InputText id='usuario' placeholder='Usuário'></InputText>
                    <InputText id='senha' placeholder='Senha' password={true}></InputText>
                    <div className='m-8'>
                        <Button function={entrar} text='Entrar'></Button>
                    </div>
                    <a href='#'>
                        <span className="font-medium text-[#10543c] underline">Esqueceu sua senha?</span>
                    </a>
                </div>
            </div>
        </div>
    )
}