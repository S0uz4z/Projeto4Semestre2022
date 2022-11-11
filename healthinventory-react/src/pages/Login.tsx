import Button from "../components/Button";
import InputText from "../components/InputText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { usuarioLogadoAction } from "../actions";
import Swal from "sweetalert2";

const mapStateToProps = (store: any) => ({
  usuarioLogado: store.usuarioLogado,
});

function Login(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function entrar() {
    let usuario = document.getElementById("usuario") as HTMLInputElement;
    let senha = document.getElementById("senha") as HTMLInputElement;

    var data = JSON.stringify({
      usuario: usuario.value,
      senha: senha.value,
    });

    var config = {
      method: "post",
      url: "http://localhost:7000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.usuario);
        dispatch(usuarioLogadoAction(response.data.usuario));
        navigate("/index");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Opa...",
          text: "Algo deu errado ao fazer login!",
          confirmButtonText: "Tentar novamente",
          confirmButtonColor: "#10543c",
          iconColor: "#10543c",
        });
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
          <span className="font-extrabold text-5xl text-[#10543c] block mb-12">
            Login
          </span>
          <InputText id="usuario" placeholder="Usuário"></InputText>
          <InputText id="senha" placeholder="Senha" password={true}></InputText>
          <div className="m-8">
            <Button function={entrar} text="Entrar"></Button>
          </div>
          <a href="#">
            <span className="font-medium text-[#10543c] underline">
              Esqueceu sua senha?
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Login);
