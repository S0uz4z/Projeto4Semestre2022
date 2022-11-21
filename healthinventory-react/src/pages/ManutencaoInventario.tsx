import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";

export default function ManutencaoInventario() {
  const [editingNewItem, setEditingNewItem] = useState<boolean>(false);
  const [rerender, setRerender] = useState("buildRender");
  const navigate = useNavigate();
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery("getItems", getItems, { refetchOnWindowFocus: false });

  async function getItems() {
    var config = {
      method: "get",
      url: "http://localhost:4000/inventario",
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
        text: "Erro ao buscar os itens. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
      navigate("/");
    }
  }

  async function setNewItem(data: any) {
    var config = {
      method: "post",
      url: "http://localhost:4000/inventario",
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
        text: "Erro ao criar novo item. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  async function setItemEditado(data: any) {
    var config = {
      method: "put",
      url: `http://localhost:4000/inventario/${data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log(data);
    try {
      let response = await axios(config);
      let responseData = await response.data.result;
      return responseData;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: "Erro ao editar item. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  async function setItemDeletado(id: any) {
    var config = {
      method: "delete",
      url: `http://localhost:4000/inventario/${id}`,
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
        text: "Erro ao deletar item. Tente novamente mais tarde, ou contate um administrador.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#10543c",
        iconColor: "#10543c",
      });
    }
  }

  function renderNovoItem() {
    if (editingNewItem == false) {
      let listaItens = document.getElementById("listaItens");

      let novoItemDiv = document.createElement("div");
      novoItemDiv.setAttribute("id", "novoItem");
      novoItemDiv.className =
        "flex flex-row list-none bg-[#10543c] h-10 text-white items-center font-bold relative my-1";

      let novoItemSpan = document.createElement("span");

      let novoItemIconCheck = document.createElement("i");
      novoItemIconCheck.className =
        "fa-solid fa-check text-white inline absolute z-50 left-0 top-0 p-3 cursor-pointer";
      novoItemIconCheck.onclick = async () => {
        let nomeItem = document.getElementById("nomeItem") as HTMLInputElement;
        let qtdItem = document.getElementById("qtdItem") as HTMLInputElement;

        let novoItem = {
          nomeItem: nomeItem.value,
          qtdItem: qtdItem.value,
        };
        if (nomeItem.value == "" || qtdItem.value == "") {
          Swal.fire({
            icon: "error",
            title: "Opa...",
            text: "Termine de preencher os campos para criar um novo item.",
            confirmButtonText: "Okay",
            confirmButtonColor: "#10543c",
            iconColor: "#10543c",
          });
        } else {
          await setNewItem(novoItem);
          await refetch();
          let divNovoItemRemover = document.getElementById("novoItem");
          divNovoItemRemover?.remove();
          setEditingNewItem(false);
          setRerender("renderNovoItem");
        }
      };

      let novoItemIconX = document.createElement("i");
      novoItemIconX.className =
        "fa-solid fa-xmark text-white inline absolute z-50 left-12 top-0 p-3 cursor-pointer";
      novoItemIconX.onclick = () => {
        let divNovoItemRemover = document.getElementById("novoItem");
        divNovoItemRemover?.remove();
        setEditingNewItem(false);
      };
      novoItemSpan.appendChild(novoItemIconCheck);
      novoItemSpan.appendChild(novoItemIconX);

      let inputNomeItem = document.createElement("input");
      inputNomeItem.setAttribute("type", "text");
      inputNomeItem.setAttribute("id", "nomeItem");
      inputNomeItem.className = "w-[50%] bg-transparent text-center focus: outline-none";

      let inputQuantItem = document.createElement("input");
      inputQuantItem.setAttribute("type", "number");
      inputQuantItem.setAttribute("id", "qtdItem");
      inputQuantItem.className = "w-[50%] bg-transparent text-center focus: outline-none";

      novoItemDiv.appendChild(novoItemSpan);
      novoItemDiv.appendChild(inputNomeItem);
      novoItemDiv.appendChild(inputQuantItem);

      listaItens?.appendChild(novoItemDiv);
      setEditingNewItem(true);
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

  function editarItem(eClick: any) {
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
          text: "O nome ou quantidade do item será alterado!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#10543c",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sim, desejo alterar!",
          iconColor: "#10543c",
        }).then((result) => {
          if (result.isConfirmed) {
            setItemEditado({
              id: eClick.target.parentElement.parentElement.children[1].children[0].value,
              nome: eClick.target.parentElement.parentElement.children[2].children[0].value,
              qtd: eClick.target.parentElement.parentElement.children[3].children[0].value,
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

  function deletarItem(e: any) {
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
        setItemDeletado(id);
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
      return data.map((item: any, index: any) => {
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
                  editarItem(e);
                }}
              ></i>
              <i
                className="fa-solid fa-trash text-white inline absolute left-12 top-0 p-3"
                onClick={(e) => {
                  deletarItem(e);
                }}
                aria-hidden="true"
              ></i>
            </a>
            <li className="w-[33%]">
              <input
                type={`text`}
                disabled
                defaultValue={item.id}
                className="bg-transparent text-center"
              ></input>
            </li>
            <li className="w-[33%]">
              <input
                type={`text`}
                disabled
                defaultValue={item.nome}
                className="bg-transparent text-center"
              ></input>
            </li>
            <li className="w-[33%]">
              <input
                type={`text`}
                disabled
                defaultValue={item.quantidade}
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
        <span className="font-bold text-4xl text-black">Inventário</span>
        <div className="px-5">
          <div className="flex flex-row list-none font-bold">
            <span className="w-[33%]">Id</span>
            <span className="w-[33%]">Item</span>
            <span className="w-[33%]">Quantidade</span>
          </div>
          <ul id="listaItens">{renderList(items)}</ul>
        </div>
        <div
          className="flex flex-row absolute bottom-0 p-5"
          onClick={() => {
            renderNovoItem();
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
