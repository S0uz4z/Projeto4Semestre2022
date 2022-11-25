import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";

export default function ManutencaoUsuario() {
  const [editingNewUser, setEditingNewUser] = useState<boolean>(false);
  const [rerender, setRerender] = useState("buildRender");
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("getUsers", getUsers, { refetchOnWindowFocus: false });

  async function getUsers() {
    var config = {
      method: "get",
      url: "http://localhost:9000/usuarios",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios(config);
      let responseData = await response.data.result;
      return responseData;
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Erro ao buscar os usuários. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
      navigate("/");
    }
  }

  async function setNewUser(data: any) {
    var config = {
      method: "post",
      url: "http://localhost:9000/usuarios",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      let response = await axios(config);
      let responseData = await response.data.result;
      return responseData;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Erro ao criar novo usuário. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  async function setUserEditado(data: any) {
    var config = {
      method: "put",
      url: `http://localhost:9000/usuarios/${data.userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      let response = await axios(config);
      let responseData = await response.data.result;
      return responseData;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Erro ao editar usuário. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  async function setUserDeletado(id: any) {
    var config = {
      method: "delete",
      url: `http://localhost:9000/usuarios/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios(config);
      let responseData = await response.data.result;
      return responseData;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Erro ao deletar usuário. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  function renderNovoUser() {
    if (editingNewUser == false) {
      let listaUsers = document.getElementById("listaUsuarios");

      let novoUserDiv = document.createElement("div");
      novoUserDiv.setAttribute("id", "novoUser");
      novoUserDiv.className =
        "flex flex-row list-none bg-[#10543c] h-10 text-white items-center font-bold relative my-1";

      let novoUserSpan = document.createElement("span");

      let novoUserIconCheck = document.createElement("i");
      novoUserIconCheck.className =
        "fa-solid fa-check text-white inline absolute z-50 left-0 top-0 p-3 cursor-pointer";
      novoUserIconCheck.onclick = async () => {
        let usuarioUser = document.getElementById("usuarioUser") as HTMLInputElement;
        let senhaUser = document.getElementById("senhaUser") as HTMLInputElement;
        let tipoUser = document.getElementById("tipoUser") as HTMLInputElement;

        let novoUser = {
          usuarioUser: usuarioUser.value,
          senhaUser: senhaUser.value,
          tipoUser: tipoUser.value
        };
        if (
          usuarioUser.value == "" ||
          senhaUser.value == "" ||
          tipoUser.value == ""
        ) {
          Swal.fire({
            icon: "error",
            title: "Opa...",
            text: "Termine de preencher os campos para criar um novo usuario.",
            confirmButtonText: "Okay",
            confirmButtonColor: "#10543c",
            iconColor: "#10543c",
          });
        } else {
          await setNewUser(novoUser);
          await refetch();
          let divNovoUsuarioRemover = document.getElementById("novoUser");
          divNovoUsuarioRemover?.remove();
          setEditingNewUser(false);
          setRerender("renderNovoUser");
        }
      };

      let novoUserIconX = document.createElement("i");
      novoUserIconX.className =
        "fa-solid fa-xmark text-white inline absolute z-50 left-12 top-0 p-3 cursor-pointer";
      novoUserIconX.onclick = () => {
        let divNovoUserRemover = document.getElementById("novoUser");
        divNovoUserRemover?.remove();
        setEditingNewUser(false);
      };
      novoUserSpan.appendChild(novoUserIconCheck);
      novoUserSpan.appendChild(novoUserIconX);

      let inputNomeUser = document.createElement("input");
      inputNomeUser.setAttribute("type", "text");
      inputNomeUser.setAttribute("id", "nomeUser");
      inputNomeUser.className = "w-[50%] bg-transparent text-center focus: outline-none";

      let inputUsuarioUser = document.createElement("input");
      inputUsuarioUser.setAttribute("type", "text");
      inputUsuarioUser.setAttribute("id", "usuarioUser");
      inputUsuarioUser.className = "w-[50%] bg-transparent text-center focus: outline-none";

      let inputSenhaUser = document.createElement("input");
      inputSenhaUser.setAttribute("type", "text");
      inputSenhaUser.setAttribute("id", "senhaUser");
      inputSenhaUser.className = "w-[50%] bg-transparent text-center focus: outline-none";

      let inputTipoUser = document.createElement("input");
      inputTipoUser.setAttribute("type", "text");
      inputTipoUser.setAttribute("id", "tipoUser");
      inputTipoUser.className = "w-[50%] bg-transparent text-center focus: outline-none";

      novoUserDiv.appendChild(novoUserSpan);
      novoUserDiv.appendChild(inputUsuarioUser);
      novoUserDiv.appendChild(inputSenhaUser);
      novoUserDiv.appendChild(inputTipoUser);

      listaUsers?.appendChild(novoUserDiv);
      setEditingNewUser(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Termine de adicionar um item para criar outro.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  function editarUser(eClick: any) {
    let inputNomeArray = Array.from(eClick.target.parentElement.parentElement.children[2].children);
    let inputQtdArray = Array.from(eClick.target.parentElement.parentElement.children[3].children);
    let inputNome = inputNomeArray[0] as HTMLInputElement;
    let inputQtd = inputQtdArray[0] as HTMLInputElement;
    inputNome.disabled = false;
    inputQtd.disabled = false;

    document.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        Swal.fire({
          title: "Tem certeza?",
          text: "As infos do usuario seram alteradas.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#10543c",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sim, desejo alterar!",
          iconColor: "#10543c",
        }).then((result) => {
          if (result.isConfirmed) {
            setUserEditado({
              userId: eClick.target.parentElement.parentElement.children[1].children[0].value,
              userUsuario: eClick.target.parentElement.parentElement.children[2].children[0].value,
              userSenha: eClick.target.parentElement.parentElement.children[3].children[0].value,
            });
            refetch();
            setRerender("rerenderEdit");
            inputNome.disabled = true;
            inputQtd.disabled = true;
            Swal.fire({
              title: "Sucesso!",
              text: "O item foi editado corretamente!",
              icon: "success",
              confirmButtonColor: "#10543c",
              confirmButtonText: "Okay!",
              iconColor: "#10543c",
            });
          }
        });
      }
    });
  }

  function deletarUser(e: any) {
    let id = e.target.parentElement.parentElement.children[1].children[0].value;
    Swal.fire({
      title: "Tem certeza?",
      text: "O item será excluído!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10543c",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, desejo excluir!",
      iconColor: "#10543c",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserDeletado(id);
        Swal.fire({
          title: "Sucesso!",
          text: "O item foi excluído corretamente!",
          icon: "success",
          confirmButtonColor: "#10543c",
          confirmButtonText: "Okay!",
          iconColor: "#10543c",
        });
        setRerender("rerenderDelete");
        refetch();
      }
    });
  }

  function renderList(data: any) {
    if (data)
      return data.map((user: any, index: any) => {
        return (
          <div
            key={index}
            className="flex flex-row list-none bg-[#10543c] h-10 text-white items-center font-bold relative my-1"
          >
            <a href="#">
              <i
                className="fa fa-pencil text-white inline absolute left-0 top-0 p-3"
                aria-hidden="true"
                onClick={(e) => {
                  editarUser(e);
                }}
              ></i>
              <i
                className="fa-solid fa-trash text-white inline absolute left-12 top-0 p-3"
                onClick={(e) => {
                  deletarUser(e);
                }}
                aria-hidden="true"
              ></i>
            </a>
            <li className="w-[20%]">
              <input
                type={`text`}
                disabled
                defaultValue={user.id}
                className="bg-transparent text-center"
              ></input>
            </li>
            <li className="w-[20%]">
              <input
                type={`text`}
                disabled
                defaultValue={user.usuario}
                className="bg-transparent text-center"
              ></input>
            </li>
            <li className="w-[20%]">
              <input
                type={`password`}
                disabled
                defaultValue={user.senha}
                className="bg-transparent text-center"
              ></input>
            </li>
            <li className="w-[20%]">
              <input
                type={`text`}
                disabled
                defaultValue={user.tipo}
                className="bg-transparent text-center"
              ></input>
            </li>
          </div>
        );
      });
  }

  return (
    <div className="w-full h-screen mt-10">
      <div className="w-[50%] min-h-[50%] border-black border-2 border-solid m-auto text-center relative">
        <span className="font-bold text-4xl text-black">Usuários</span>
        <div className="px-5">
          <div className="flex flex-row list-none font-bold">
            <span className="w-[25%]">Id</span>
            <span className="w-[25%]">Usuario</span>
            <span className="w-[25%]">Senha</span>
            <span className="w-[25%]">Tipo</span>
          </div>
          <ul id="listaUsuarios">{renderList(users)}</ul>
        </div>
        <div
          className="flex flex-row absolute bottom-0 p-5"
          onClick={() => {
            renderNovoUser();
          }}
        >
          <div className="w-12 h-12 bg-[#10543c] rounded-full text-white flex mx-2 cursor-pointer">
            <i className="fa fa-plus block m-auto text-2xl" aria-hidden="true"></i>
          </div>
        </div>
        <div className="absolute right-0 bottom-0">
          <Button
            text="Sair"
            function={() => {
              navigate("/");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}
